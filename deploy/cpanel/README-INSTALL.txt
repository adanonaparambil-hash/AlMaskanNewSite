AL MASKAAN VILLAGE WEBSITE — WHAT TO DO ON GODADDY
==================================================

The website is already live at almaskaanvillage.com (GoDaddy cPanel hosting).
This file lists everything to do on GoDaddy: (A) update the website, (B) make the inquiry
form emails arrive, (C) check it works. Nothing needs to be edited inside the website files.


A. UPDATE THE WEBSITE  (each time you receive a new AlMaskanVillage-cPanel.zip)
---------------------------------------------------------------------------
1. Log in to GoDaddy → My Products → Web Hosting → Manage → cPanel Admin.
2. cPanel → File Manager → open the folder  public_html
3. Top right: Settings → tick "Show Hidden Files (dotfiles)" → Save.
4. Click Upload → choose AlMaskanVillage-cPanel.zip → wait for 100% → go back to public_html.
5. Right-click AlMaskanVillage-cPanel.zip → Extract → extract to  /public_html  → Extract Files.
   If asked about existing files: allow it to overwrite them.
6. Delete AlMaskanVillage-cPanel.zip from public_html (it is no longer needed).
7. Check that public_html directly contains:  .htaccess   en.html   ar.html   api   assets   _img   _next
   (they must not be inside a sub-folder).

   Kept automatically during updates: the visitor count, and api/config.php if you ever created one.


B. MAKE THE INQUIRY FORM EMAILS ARRIVE  (one time only)
------------------------------------------------------
The form already sends every inquiry by email:
  To:    operations@almaskaanvillage.com
  From:  website@almaskaanvillage.com   (Reply goes straight to the visitor)
Two GoDaddy settings are needed so these emails reach your Google (Gmail) inbox and not spam:

8. EMAIL ROUTING  — the most important step
   cPanel → search "Email Routing" → select the domain almaskaanvillage.com
   → choose  "Remote Mail Exchanger"  → click Change.
   Why: your company email is on Google Workspace. If this stays on "Local Mail Exchanger",
   GoDaddy keeps @almaskaanvillage.com emails on its own server and they never reach Gmail.

9. SPF RECORD  — so the emails do not go to spam
   GoDaddy → My Products → Domains → almaskaanvillage.com → DNS → Add New Record:
       Type:   TXT
       Name:   @
       Value:  v=spf1 include:_spf.google.com include:secureserver.net ~all
       TTL:    1 Hour
   Save. (If a TXT record starting with "v=spf1" already exists, edit that one instead —
   a domain must have only one SPF record.)

10. PHP VERSION
    cPanel → "MultiPHP Manager" → tick almaskaanvillage.com → PHP 8.1 or newer → Apply.

11. HTTPS
    cPanel → "SSL/TLS Status" → if the domain is not green, click "Run AutoSSL".

Optional — to send inquiries to a different or extra address:
   In public_html/api rename  config.sample.php  to  config.php , click Edit, change the
   INQUIRY_TO line (separate several addresses with commas), Save.


C. CHECK IT WORKS
-----------------
12. Open  https://almaskaanvillage.com  and  https://almaskaanvillage.com/ar  on a computer
    and on a phone.
13. Open  https://almaskaanvillage.com/individuals/junior-staff  → it must jump to /rooms/shared.
14. Contact us page → send a test inquiry using your own email address:
      - the page must say "Thank you — your message has been sent"
      - the email must arrive at operations@almaskaanvillage.com within a few minutes
        (wait up to 1 hour after step 9 the first time; check Spam and mark it "Not spam").


IF THE FORM DOES NOT WORK
-------------------------
"Our online form is not available right now…"   → api/config.php exists but an address is empty:
                                                 fix or delete api/config.php
"Thank you…" but no email arrives               → step 8 (Email Routing) is not set to Remote
The email arrives in Spam                        → step 9 (SPF), then mark it "Not spam"
"Something went wrong…"                          → cPanel → "Track Delivery" shows the reason;
                                                 check step 10 (PHP 8.1+)
Still nothing                                    → GoDaddy limits how many emails a hosting plan
                                                 may send; ask GoDaddy support, or ask the
                                                 developer to send through Google Workspace instead.


GOOD TO KNOW
------------
- The site assistant (chat button) answers from its built-in topics; the AI answers need a
  Node.js server and are not part of the GoDaddy version.
- Visitor counter: stored in public_html/api/data/visits.txt.
- Phones and slow computers automatically get a lighter version of the animations, smaller
  images and a smaller background film; visitors who switch off motion get a still version.
