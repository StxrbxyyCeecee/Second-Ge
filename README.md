# Links → QR Codes

Small static web page that converts one or more links into downloadable QR images.

Usage
- Open [index.html](index.html) in your browser.
- Paste one or more links into the textarea (one per line).
- Adjust `Size` if you want bigger images.
- Click `Generate` — QR images appear with `Download` and `Copy Link` actions.

Notes
- This uses the public QR API at `api.qrserver.com` to produce PNG images.
- If you meant something else by “QQ code”, tell me and I can adapt the output format.
 
Adding a logo
- To use a custom logo in the left sidebar, place an image named `logo.png` next to `index.html` (same folder). The page will show that image in the sidebar automatically; remove or rename the file to fall back to the text badge.
