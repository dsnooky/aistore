# Affiliate Store — GitHub Redesign

A redesigned frontend for the original Affiliate Store V4.

## What changed
- Modern responsive storefront UI
- Modern mobile-friendly admin command center
- Cleaner product cards, search, category filters and marketplace buttons
- Redesigned dashboard, product editor, content queue, campaign builder and AI Studio
- GitHub Pages friendly: plain HTML/CSS/JavaScript, no build step
- No backend schema changes
- No Google Apps Script changes
- Existing Google Sheets backend actions remain the same

## Backend compatibility
The frontend continues to use the same Apps Script actions:

GET:
- `store`
- `admin`
- `product`
- `stats`
- `content`

POST:
- `saveProduct`
- `deleteProduct`
- `saveCampaign`
- `saveContent`
- `deleteContent`
- `track`
- `bulkProducts`

## Deploy on GitHub Pages
1. Create a GitHub repository.
2. Upload `index.html` and `admin.html`.
3. In both files, replace:
   `PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE`
   with your existing Google Apps Script Web App URL.
4. Enable GitHub Pages for the repository.
5. Open the generated GitHub Pages URL.

Keep the existing Google Sheet and Apps Script deployment exactly as they are.

## Important
Do not put private API keys in the HTML files.
