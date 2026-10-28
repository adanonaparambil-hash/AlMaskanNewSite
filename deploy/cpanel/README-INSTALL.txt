AL MASKAAN VILLAGE WEBSITE — INSTALLING ON GODADDY (cPanel Web Hosting)
=======================================================================

This package is the complete website as plain files (English + Arabic), plus three small PHP files for the
inquiry form, the visitor counter and the site assistant. No database and no WordPress are needed.

Needs: GoDaddy cPanel Web Hosting (Linux), PHP 8.0 or newer, an SSL certificate (free AutoSSL in cPanel).
Note: GoDaddy "Managed WordPress" plans cannot host this site — it must be a cPanel plan.


1. BACK UP, THEN EMPTY public_html
   - cPanel → File Manager → public_html.
   - If an old site is there, download a backup first (select all → Compress), then delete the old files.
   - In File Manager: Settings (top right) → tick "Show Hidden Files (dotfiles)".

2. UPLOAD AND EXTRACT
   - Upload AlMaskanVillage-cPanel.zip into public_html.
   - Right-click the zip → Extract → into /public_html. Then delete the zip.
   - Check that public_html now directly contains: .htaccess, en.html, ar.html, 404.html, api/, assets/, _next/ …
     (not a sub-folder holding them). The .htaccess file is essential.

3. SET UP THE INQUIRY FORM EMAIL  (first install only)
   - In public_html/api: rename config.sample.php to config.php, then Edit it:
       'INQUIRY_TO'   => 'operations@almaskaanvillage.com',   ← who receives inquiries (comma-separate several)
       'INQUIRY_FROM' => 'website@almaskaanvillage.com',      ← sender; must be an address of this domain
   - cPanel → Email Routing → choose almaskaanvillage.com → "Remote Mail Exchanger" → Change.
     (The company email is on Google Workspace. Without this, cPanel keeps @almaskaanvillage.com mail on the
      GoDaddy server and the inquiries never reach Gmail.)
   - DNS (GoDaddy → Domain → DNS): the domain has no SPF record, so website emails may land in spam.
     Add a TXT record:  Name: @   Value: v=spf1 include:_spf.google.com include:secureserver.net ~all
   Until config.php is filled in, the form honestly tells visitors their message was not sent and shows the
   phone numbers and email instead.

4. PHP VERSION AND HTTPS
   - cPanel → MultiPHP Manager → set the domain to PHP 8.1 or newer.
   - cPanel → SSL/TLS Status → run AutoSSL so https:// works. The site redirects every visitor to https.

5. CHECK IT  (open each in a browser)
   - https://almaskaanvillage.com            → English home page
   - https://almaskaanvillage.com/ar         → Arabic home page
   - https://almaskaanvillage.com/rooms      → Rooms page
   - https://almaskaanvillage.com/individuals/junior-staff → must jump to /rooms/shared (old address redirect)
   - Contact us → send a test inquiry → it must arrive in the INQUIRY_TO mailbox.
   - Footer: "visitors since launch" starts counting from the first visitor.


UPDATING THE WEBSITE LATER
   - Upload and extract the new zip over the old files (allow overwrite).
   - Your api/config.php and the visitor count (api/data/visits.txt) are not in the zip, so they are kept.


WHAT IS DIFFERENT FROM THE VERCEL VERSION
   - Site assistant: answers from its built-in topics (rooms, quotes, catering, retail, spaces, lifestyle,
     location, contact). The AI answers need a Node.js server.
   - Visitor counter: kept in a small file on this server (api/data/visits.txt) — counting starts at 0.
   - Vercel Web Analytics is not included (it only works on Vercel); Google Analytics can be added instead.
   - Images are served at their prepared size (no automatic resizing), which is fine for this site.
