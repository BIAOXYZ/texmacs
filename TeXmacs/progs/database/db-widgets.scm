
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;
;; MODULE      : db-widgets.scm
;; DESCRIPTION : widgets for searching and managing databases
;; COPYRIGHT   : (C) 2015  Joris van der Hoeven
;;
;; This software falls under the GNU general public license version 3 or later.
;; It comes WITHOUT ANY WARRANTY WHATSOEVER. For details, see the file LICENSE
;; in the root directory or <http://www.gnu.org/licenses/gpl-3.0.html>.
;;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(texmacs-module (database db-widgets)
  (:use (database db-convert)
        (database db-tmfs)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Preferences
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(tm-widget (db-preferences-widget)
  ===
  (text "Not yet implemented")
  ===)

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Pretty printing with cache
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define db-pretty-cache (make-ahash-table))

(define (get-name entry)
  (or (and (tm-func? entry 'db-result 2)
           (string? (tm-ref entry 0))
           (tm-ref entry 0))
      (db-entry-ref entry "name")))

(define (db-pretty-cached l kind fm)
  (when (not (ahash-ref db-pretty-cache (list kind fm)))
    (ahash-set! db-pretty-cache (list kind fm) (make-ahash-table)))
  (with cache (ahash-ref db-pretty-cache (list kind fm))
    (let* ((todo (list-filter l (negate (cut ahash-ref cache <>))))
           (pretty (db-pretty todo kind fm))
           (srcs (make-ahash-table))
           (objs (make-ahash-table)))
      (for-each (lambda (entry)
                  (and-with name (get-name entry)
                    (ahash-set! srcs name entry))) todo)
      (for-each (lambda (p)
                  (and-with name (get-name p)
                    (ahash-set! objs name p))) pretty)
      (for (name (map car (ahash-table->list srcs)))
        (let* ((src (ahash-ref srcs name))
               (obj (ahash-ref objs name)))
          (when (and src obj)
            (ahash-set! cache src obj)))))
    (with cv (lambda (x) (with y (ahash-ref cache x) (or y x)))
      (sort (map cv l)
            (lambda (p1 p2)
              (let* ((n1 (get-name p1))
                     (n2 (get-name p2)))
                (and n1 n2 (string<=? n1 n2))))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Producing the search results
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define db-search-cache (make-ahash-table))
(define db-result-cache (make-ahash-table))

(define (db-search-cached q)
  (with cached (ahash-ref db-search-cache q)
    (or cached
        (with r (db-search q)
          (ahash-set! db-search-cache q r)
          r))))

(define (db-get-result-cached id)
  (with cached (ahash-ref db-result-cache id)
    (or cached
        (with r (db-load-entry id)
          (ahash-set! db-result-cache id r)
          r))))

(define (db-search-results db kind query)
  (with-database db
    (with-limit 20
      ;; TODO: filter on user permissions
      (let* ((types (smart-ref db-kind-table kind))
	     (q (list (list :completes query)
		      (cons "type" types)))
	     (ids (db-search-cached q))
	     (l (map db-get-result-cached ids))
	     (r (db-pretty-cached l kind :pretty)))
	(cond ((null? r) (list "No matching items"))
	      ((>= (length r) 20) (rcons r "More items follow"))
	      (else r))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Search the database
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define db-quit-search ignore)
(define db-search-keypress-serial 0)

(define (db-search-keypress db kind event old-query)
  (when (pair? event)
    (with (new-query key) event
      (when (!= new-query old-query)
        (with serial (+ db-search-keypress-serial 1)
          (set! db-search-keypress-serial serial)
          (delayed
            (:pause 200)
            (when (== db-search-keypress-serial serial)
              (with doc `(document ,@(db-search-results db kind new-query))
                (buffer-set-body "tmfs://aux/db-search-results" doc))
              ;;(refresh-now "db-search-results")
              ))))
      new-query)))

(tm-define (db-confirm-result t)
  (:secure #t)
  (when (tm-atomic? t)
    (db-quit-search (tm->string t))))

(tm-widget ((db-search-widget db kind) quit)
  (padded
    (let* ((dummy (set! db-quit-search quit))
	   (query ""))
      (hlist
	(text "Search:") // //
	(input (set! query (db-search-keypress db kind answer query))
	       "search-database" (list "") "650px"))
      === ===
      (refreshable "db-search-results"
	(resize "750px" "500px"
	  (texmacs-input `(document ,@(db-search-results db kind query))
			 `(style (tuple ,(db-get-style kind)))
			 "tmfs://aux/db-search-results"))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Manage user identities
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(define adding-user? #f)
(define adding-info (make-ahash-table))

(define (get-default-pseudo*)
  (if adding-user?
      "?"
      (user->pseudo (get-default-user))))

(define (get-user-info* attr)
  (if adding-user?
      (or (ahash-ref adding-info attr) "")
      (get-user-info attr)))

(define (set-user-info* attr val)
  (if adding-user?
      (begin
        (ahash-set! adding-info attr val)
        (let* ((pseudo (ahash-ref adding-info "pseudo"))
               (name (ahash-ref adding-info "name")))
          (when (and pseudo name (!= pseudo "") (!= name ""))
            (with uid (add-user pseudo name)
              (set! adding-user? #f)
              (set-default-user uid)
              (for (p (ahash-table->list adding-info))
                (when (nin? (car p) (list "pseudo" "name"))
                  (set-user-info (car p) (cdr p)))))
            (refresh-now "identities-list"))))
      (set-user-info attr val))
  (when (== attr "pseudo")
    (refresh-now "identities-list")))

(tm-widget (db-identities-widget)
  (padded
    (hlist
      (resize "150px" "400px"
        (vlist
          (bold (text "User"))
          ======
          (refreshable "identities-list"
            (choice (begin
                      (set! adding-user? #f)
                      (set-default-user (pseudo->user answer))
                      (refresh-now "identity-info"))
                    (map user->pseudo (get-users-list))
                    (get-default-pseudo*)))
          ===
          (hlist
            ((icon "tm_add_2.xpm")
             (set! adding-user? #t)
             (set! adding-info (make-ahash-table))
             (refresh-now "identities-list")
             (refresh-now "identity-info"))
            ((icon "tm_close_tool.xpm") (display* "Remove\n"))
            >>)))
      // // //
      (resize "400px" "400px"
        (vlist
          (bold (text "Information"))
          ======
          (refreshable "identity-info"
            (aligned
              (item (text "Pseudo:")
                (input (set-user-info* "pseudo" answer) "string"
                       (list (get-user-info* "pseudo")) "40em"))
              (item (text "Full name:")
                (input (set-user-info* "name" answer) "string"
                       (list (get-user-info* "name")) "40em"))
              (item (text "Email:")
                (input (set-user-info* "email" answer) "string"
                       (list (get-user-info* "email")) "40em"))))
          (glue #f #t 0 0))))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Exported routines
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(tm-define (open-identities)
  (:interactive #t)
  (set! adding-user? #f)
  (top-window db-identities-widget "Specify user identity"))

(tm-define (open-db-chooser db kind name call-back)
  (:interactive #t)
  (db-reset)
  (set! db-search-cache (make-ahash-table))
  (set! db-result-cache (make-ahash-table))
  (dialogue-window (db-search-widget db kind)
		   (lambda args
		     (set! db-quit-search ignore)
		     (apply call-back args))
		   name))

(tm-define (open-db-preferences)
  (:interactive #t)
  (top-window db-preferences-widget "TeXmacs database preferences"))
