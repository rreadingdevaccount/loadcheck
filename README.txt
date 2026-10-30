LOAD CHECK — phone scanner for AI Transport Plan QR codes
=========================================================

What it does
- Scan the MANIFEST / WAYBILL code first. From workbook v56 it carries the full Load ID:
  L0120#<Load ID> = 120 boxes expected (the app calculates the 6-character load check code from the Load ID).
  Older manifests and the Box Labels stickers use the short form M0120#XXXXXX (XXXXXX = load check code);
  if a short code was scanned first, scanning the full manifest code later adds the Load ID ("LOAD ID ADDED").
- Then scan each box label (format B0007#XXXXXX = box 7).
- Belongs to this load: high beep + green flash, counter goes up (e.g. 87 / 120).
- Wrong load: low buzz + red flash + vibration (Android; iPhones cannot vibrate from a web app).
- Same box scanned twice: double beep + amber. Box number above the manifest total: warning tone + amber.
- All boxes scanned: rising chime.
- Buttons: Missing (box numbers not yet scanned), Undo last, Type box # (for a damaged label, logged as manual),
  Light (torch, Android), Log, Export CSV (share or download the scan log), Sound on/off, New manifest.
- Load / Receive switch at the top: use Receive at the destination; the mode is recorded in the log.
- Location (v2): every log row records Latitude, Longitude (decimal degrees, 6 decimals), Accuracy (m) and
  Fix age (s = how old the GPS reading was at the moment of the scan). Blank when there is no fix.
  The CSV Summary row gives the median location of the manifest's scans (fixes within 100 m accuracy and
  2 minutes old; if there are none, all fixes are used and the note says so). The GPS badge shows the
  current accuracy (green = 30 m or better, amber = worse or old, "blocked" = permission refused).
  Location never blocks scanning; GPS pauses while the phone is locked or the app is in the background.
- Load ID (v3): shown at the top, in a "Load ID" column on every CSV row and in the summary row; the CSV
  file is named LoadCheck_<Load ID>_<Load|Receive>_<date-time>.csv. CSV columns: Time, Mode, Load ID,
  Load check code, Code scanned, Result, Box #, Note, Latitude, Longitude, Accuracy (m), Fix age (s), Map link.
- Map link (v4): last CSV column. Every scan row with a GPS fix gets a Google Maps link to that scan's position;
  the Summary row gets a link to the median location. Format (no key or account needed):
  https://www.google.com/maps/search/?api=1&query=-18.142378,178.441062
  Blank when there is no fix. Opening a link needs signal (or an offline map downloaded in Google Maps).
  In Excel the link is plain text: click into the cell and press Enter (or F2, Enter) to make it clickable, or copy it
  into a browser. Phones, email and Google Sheets usually make it clickable as is.
- Progress survives the phone locking or the app closing. Works offline after the first visit.
- Nothing is sent anywhere: scans stay on the phone until you export them.

Files (upload all five, unchanged)
  index.html  sw.js  manifest.webmanifest  icon-192.png  icon-512.png

Publish free on GitHub Pages (one time, about 10 minutes)
1. Create a free account at github.com (or sign in).
2. Click "+" (top right) > New repository. Name: loadcheck. Choose Public. Click Create repository.
3. On the new repository page click "uploading an existing file". Drag in the five files. Click Commit changes.
4. Settings (top of the repository) > Pages (left menu). Under "Build and deployment": Source = Deploy from a branch,
   Branch = main, folder = / (root). Click Save.
5. Wait 1-2 minutes, refresh the Pages screen: it shows the address, e.g. https://YOUR-NAME.github.io/loadcheck/
6. Send that address to field staff (or print it as a QR code on the Instructions sheet).

Install on a phone
- iPhone (Safari): open the address > Share button > Add to Home Screen. Open it from the home screen, tap
  Start scanning, Allow camera. Turn the ring/silent switch to ring, otherwise iOS mutes the beeps.
- Android (Chrome): open the address > menu (three dots) > Install app (or Add to Home screen). Allow camera.
- Open it once while online; after that it works without signal.

Updating the app later (e.g. this v4.1 update)
1. Unzip LoadCheck_App.zip on your computer.
2. github.com > sign in > open your loadcheck repository.
3. Click "Add file" > "Upload files". Drag in index.html and sw.js (the other files are unchanged, but
   uploading all five is harmless). GitHub replaces files with the same name.
4. Commit message: "Load Check v4.1". Click "Commit changes".
5. Wait 1-2 minutes (Actions tab shows "pages build and deployment" with a green tick when live).
   Check the upload is live: open https://YOUR-NAME.github.io/loadcheck/sw.js in a browser - line 2 must show
   the new CACHE name (loadcheck-v4.1). If it shows an older name, the upload did not replace sw.js.
6. On each phone, open the app while online, close it fully, open it again. The second opening runs the new
   version: the version number shows next to "Load Check" at the top (v4.1). From v4.1 the app page is
   loaded fresh whenever there is signal, so later updates show as soon as they are live.
7. Check: with Location allowed, scan a manifest and two boxes, Export CSV: the last column is "Map link";
   tap the Summary row link and Google Maps opens at the load location.
v4.1 fixes the update problem in v4: phones that opened the app within ~10 minutes of an upload could store the
OLD page under the new version and stay on it (no Map link column). v4.1 always downloads fresh copies and shows
the version number. v4/v4.1 change only the exported CSV and the update mechanism; scanning, sounds and saved progress are unchanged, so phones still on v3
keep working (their CSVs just have no Map link column).
Reminder from v3: phones must be on v3 or later before printing manifests from workbook v56 or later
(older versions buzz WRONG LOAD on the full-Load-ID manifest code).
If a phone still shows the old app: iPhone - delete the home-screen icon and add it again from Safari;
Android - Chrome > Settings > Site settings > (the app address) > Clear & reset, then reopen.
Scans already on a phone are kept through the update (export the CSV first if you need to clear site data).

Licences
- Load Check: built for your organisation; no licence fees.
- QR decoding: jsQR 1.4.0 by Cosmo Wolfe, Apache License 2.0 (included inside index.html).
- "QR Code" is a registered trademark of DENSO WAVE INCORPORATED.
