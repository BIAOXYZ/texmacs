<TeXmacs|1.99.9>

<style|<tuple|source|std|english>>

<\body>
  <active*|<\src-title>
    <src-package|tmdoc-web2|1.0>

    <\src-purpose>
      New design for <TeXmacs> web site.
    </src-purpose>

    <src-copyright|2019|Joris van der Hoeven>

    <\src-license>
      This software falls under the <hlink|GNU general public license,
      version 3 or later|$TEXMACS_PATH/LICENSE>. It comes WITHOUT ANY
      WARRANTY WHATSOEVER. You should have received a copy of the license
      which the software. If not, see <hlink|http://www.gnu.org/licenses/gpl-3.0.html|http://www.gnu.org/licenses/gpl-3.0.html>.
    </src-license>
  </src-title>>

  \;

  <assign|html-site-version|2>

  <assign|html-css|../css/tmweb2.css>

  <\active*>
    <\src-comment>
      Miscellaneous helper macros.
    </src-comment>
  </active*>

  <assign|obsolete|<macro|body|<greyed|<html-class|tmweb-obsolete|<arg|body>>>>>

  <assign|tmweb-image|<macro|name|<image|<merge|http://www.texmacs.org/Samples/|<arg|name>>|0.666667w|||>>>

  <assign|tmweb-email|<macro|name|domain|<active*|<with|font-family|tt|color|dark
  magenta|\<less\>>><with|font-family|tt|color|dark
  blue|<arg|name>><active*|<with|font-family|tt|color|dark
  magenta|@>><with|font-family|tt|color|dark
  blue|<arg|domain>><active*|<with|font-family|tt|color|dark
  magenta|\<gtr\>>>>>

  <assign|tmweb-current|<macro|a|b|>>

  <\active*>
    <\src-comment>
      Hyperlink menus
    </src-comment>
  </active*>

  <assign|tmweb-top-table|<macro|body|<tabular|<tformat|<cwith|1|1|1|1|cell-hyphen|t>|<twith|table-valign|T>|<cwith|1|1|1|1|cell-lsep|1em>|<cwith|1|1|1|1|cell-rsep|1em>|<table|<row|<\cell>
    <\compact>
      <arg|body>
    </compact>
  </cell>>>>>>>

  <assign|tmweb-top-table|<macro|body|<space|1em><arg|body><space|1em>>>

  <assign|tmweb-link-item|<macro|body|<space|0.5em><arg|body>>>

  <assign|tmweb-link-menu|<xmacro|args|<arg|args|0><map-args|tmweb-link-item|concat|args|1>>>

  <assign|tmhtml-tmweb-link-menu|<xmacro|args|<html-tag|nav|<map-args|identity|concat|args>>>>

  <assign|tmweb-link-section|<xmacro|args|<map-args|tmweb-top-table|document|args|0>>>

  <assign|tmhtml-tmweb-link-section|<xmacro|args|<html-tag|section|<arg|args|0><html-tag|nav|<map-args|tmweb-link-item|concat|args|1>>>>>

  <assign|tmhtml-tmweb-link-section|<xmacro|args|<html-tag|section|<arg|args|0><html-tag|nav|<map-args|identity|concat|args|1>>>>>

  <\active*>
    <\src-comment>
      Hard-coded hyperlinks. Argh, but well...
    </src-comment>
  </active*>

  <assign|tmweb-top-links|<macro|<style-with|src-compact|none|<tmweb-link-menu|<hlink|About|../home/welcome.en.tm>|<specific|texmacs|<hlink|Download|../download/download.en.tm>><specific|html|\<less\>script
  language="javascript"\<gtr\>document.write (downloadRelativeLink
  ("Download"));\<less\>/script\<gtr\>>|<hlink|Learn|../help/learn.en.tm>|<hlink|Contribute|../contribute/contribute.en.tm>>>>>

  <assign|tmweb-home-links|<macro|<style-with|src-compact|none|<tmweb-link-section|<section*|TeXmacs>|<hlink|Welcome|../home/welcome.en.tm>|<hlink|Gallery|../home/screenshots.en.tm>|<hlink|News|../home/news.en.tm>|<hlink|Plans|../about/plans.en.tm>|<hlink|Thanks|../home/thanks.en.tm>>>>>

  <assign|tmweb-download-links|<macro|<style-with|src-compact|none|<tmweb-link-section|<section*|Download>|<hlink|Sources|../download/sources.en.tm>|<hlink|GNU
  Linux|../download/unix.en.tm>|<hlink|MacOS|../download/macosx.en.tm>|<hlink|Windows|../download/windows.en.tm>|<hlink|Other|../download/other.en.tm>|<hlink|License|../about/license.en.tm>>>>>

  <assign|tmweb-learn-links|<macro|<style-with|src-compact|none|<tmweb-link-section|<section*|Learn>|<hlink|Videos|../home/videos.en.tm>|<hlink|Tutorials|../help/tutorial.en.tm>|<hlink|Books|../help/book.en.tm>|<obsolete|<hlink|Manual|../help/manual.en.tm>>|<hlink|FAQ|../help/faq.en.tm>|<hlink|Mailing
  lists|../home/ml.en.tm>>>>>

  <assign|tmweb-contribute-links|<macro|<style-with|src-compact|none|<tmweb-link-section|<section*|Contribute>|<obsolete|<hlink|Contribute|../contribute/contribute.en.tm>>|<obsolete|<hlink|Team|../contribute/team.en.tm>>|<hlink|Donate|../contribute/donations.en.tm>|<hlink|Develop|../contribute/develop.en.tm>|<hlink|Document|../contribute/documentation.en.tm>|<hlink|Translate|../contribute/translations.en.tm>|<hlink|Plug-ins|../contribute/plugins.en.tm>>>>>

  <assign|tmweb-contact-links|<macro|<style-with|src-compact|none|<tmweb-link-section|<section*|Contact>|<hlink|Feedback|../contact/contact.en.tm>|<hlink|Bugs|../contact/bugs.en.tm>|<hlink|Suggestions|../contact/wishes.en.tm>|<hlink|Patches|../contact/patches.en.tm>|<hlink|Mailing
  lists|../home/ml.en.tm>>>>>

  <assign|tmweb-further-links|<macro|<style-with|src-compact|none|<tmweb-link-section|<section*|Further>|<obsolete|<hlink|Philosophy|../about/philosophy.en.tm>>|<obsolete|<hlink|Artwork|../about/artwork.en.tm>>|<obsolete|<hlink|Changes|../about/changes.en.tm>>|<obsolete|<hlink|Jobs|../home/jobs.en.tm>>|<obsolete|<hlink|To
  do|../about/todo.en.tm>>|<obsolete|<hlink|Roadmap|../about/roadmap.en.tm>>|<obsolete|<hlink|Authors|../about/authors.en.tm>>|<obsolete|<hlink|Donators|../about/donators.en.tm>>>>>>

  <\active*>
    <\src-comment>
      Browsing the manual and the tutorial.
    </src-comment>
  </active*>

  <assign|tmweb-manual-links|<macro|previous|next|<style-with|src-compact|none|<tmweb-list|<tmweb-link|Manual|../help/manual>|<tmweb-link|Top|web-manual>|<tmweb-link|Previous|<arg|previous>>|<tmweb-link|Next|<arg|next>>>>>>

  <assign|tmweb-tutorial-links|<macro|previous|next|<style-with|src-compact|none|<tmweb-list|<tmweb-link|Tutorial|../help/tutorial>|<tmweb-link|Top|web-tutorial>|<tmweb-link|Previous|<arg|previous>>|<tmweb-link|Next|<arg|next>>>>>>

  <\active*>
    <\src-comment>
      Headers for the <TeXmacs> web pages.
    </src-comment>
  </active*>

  <assign|tmweb-underline|<\macro|body>
    <tabular|<tformat|<twith|table-width|1par>|<twith|table-hmode|exact>|<cwith|1|1|1|1|cell-tborder|0ln>|<cwith|1|1|1|1|cell-bborder|1ln>|<cwith|1|1|1|1|cell-lborder|0ln>|<cwith|1|1|1|1|cell-rborder|0ln>|<cwith|1|1|1|1|cell-lsep|0spc>|<cwith|1|1|1|1|cell-rsep|0spc>|<cwith|1|1|1|1|cell-hyphen|t>|<cwith|1|1|1|1|cell-bsep|1spc>|<table|<row|<\cell>
      <arg|body>
    </cell>>>>>
  </macro>>

  <assign|tmweb-tmimage|<macro|<image|../images/TeXmacs.png|3em|3em||-0.3h>>>

  <assign|tmhtml-tmweb-tmimage|<macro|<image|../images/TeXmacs.png|80px|80px||-0.3h>>>

  <assign|tmweb-header|<macro|title|<tmweb-underline|<tmweb-tmimage><space|1em><with|font-series|bold|font-size|1.3|<arg|title>><htab|5mm><with|font-size|0.8|<tmweb-top-links>>><vspace|1fn>>>

  <assign|tmhtml-tmweb-header|<macro|title|<html-div-class|tmweb-pad-below|<html-div-class|tmweb-header|<html-class|tmweb-title-image|<tmweb-tmimage>><space|1em><html-class|tmweb-title|<arg|title>><space|1em><html-class|tmweb-top-menu|<tmweb-top-links>>>>>>

  <assign|tmweb-title|<macro|title|bar|<tmweb-header|<arg|title>>>>

  <\active*>
    <\src-comment>
      Footers for the <TeXmacs> web pages.
    </src-comment>
  </active*>

  <assign|tmweb-overline|<\macro|body>
    <tabular|<tformat|<twith|table-width|1par>|<twith|table-hmode|exact>|<cwith|1|1|1|1|cell-tborder|1ln>|<cwith|1|1|1|1|cell-bborder|0ln>|<cwith|1|1|1|1|cell-lborder|0ln>|<cwith|1|1|1|1|cell-rborder|0ln>|<cwith|1|1|1|1|cell-lsep|0spc>|<cwith|1|1|1|1|cell-rsep|0spc>|<cwith|1|1|1|1|cell-hyphen|t>|<cwith|1|1|1|1|cell-tsep|1spc>|<table|<row|<\cell>
      <arg|body>
    </cell>>>>>
  </macro>>

  <assign|tmdoc-copyright|<xmacro|x|<vspace*|1fn><tmweb-overline|<copyright><small|
  \ <arg|x|0> <localize|by> <arg|x|1><map-args|tmdoc-copyright-extra|concat|x|2>>>>>

  <assign|tmhtml-tmdoc-copyright|<xmacro|x|<html-div-class|tmweb-copyright|\<copyright\>
  \ <arg|x|0> <localize|by> <arg|x|1><map-args|tmdoc-copyright-extra|concat|x|2>>>>

  <assign|tmweb-license-text|<\macro>
    <\active*>
      This webpage is part of <hlink|GNU <TeXmacs>|http://www.texmacs.org>
      and the larger <hlink|GNU project|http://www.gnu.org>. Verbatim copying
      and distribution of it is permitted in any medium, provided this notice
      is preserved.

      <hlink|Free Software Foundation|http://www.fsf.org/fsf/fsf.html>, Inc.,
      51 Franklin Street, Fifth Floor, Boston, MA 02111, USA
    </active*>
  </macro>>

  <assign|tmweb-footer-text|<\macro>
    <section*|About this website>

    <surround||<vspace|0.5fn>|<tmweb-license-text>>

    <\center>
      <tmweb-home-links><tmweb-download-links><tmweb-learn-links><tmweb-contribute-links><tmweb-contact-links><tmweb-further-links>
    </center>
  </macro>>

  <assign|tmweb-footer|<macro|<vspace*|1fn><tmweb-overline|<with|section*|<value|strong>|<small|<tmweb-footer-text>>>>>>

  <assign|tmhtml-tmweb-footer|<\macro>
    <\html-div-class|tmweb-pad-above>
      <\html-div-class|tmweb-footer>
        <html-div-class|tmweb-license|<tmweb-license-text>><tmweb-home-links><tmweb-download-links><tmweb-learn-links><tmweb-contribute-links><tmweb-contact-links>
      </html-div-class>
    </html-div-class>
  </macro>>

  <assign|tmweb-license|<macro|<tmweb-footer>>>
</body>

<\initial>
  <\collection>
    <associate|preamble|true>
  </collection>
</initial>