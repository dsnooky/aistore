AFFILIATE STORE V4 — AI AFFILIATE COMMAND CENTER

V4 adds:
- Content Queue for Facebook, TikTok, Instagram and other channels
- AI-ready SEO/product/social fields
- Campaign builder and UTM campaign field
- Content status workflow: Draft/Scheduled/Published
- Product -> content workflow
- Storefront + mobile admin
- Click analytics
- Shopee/TikTok Shop/Lazada affiliate links
- Google Sheets backend

SETUP
1. Create Google Sheet.
2. Import these CSVs as exact tabs:
Products
Categories
Settings
Banners
Campaigns
Content_Queue
Click_Tracking
3. Apps Script -> paste Code.gs.
4. Deploy as Web App, execute as you, access Anyone.
5. Copy Web App URL.
6. Replace PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE in index.html and admin.html.
7. Host both HTML files together.
8. Put your real affiliate links in Products.

AI WORKFLOW
The AI Studio includes a prompt template and storage fields. To make it fully automatic, connect an AI provider/API through a secure server-side integration or supported connector. Do not place private API keys in index.html/admin.html.

AUTOMATION READY
A future scheduler can read Content_Queue where Status=Scheduled and publish through official platform APIs/approved integrations where available. Actual platform posting permissions and API availability vary by platform/account.

AFFILIATE ATTRIBUTION
Clicks are tracked by this system. Confirmed sales/commissions require official affiliate-network reporting/API/export.
