# Connect the Enquiry Form to a Google Sheet

This turns the "Enquire" form on the landing page into a real lead capture
system. No hosting, no server, no cost — the Google Sheet itself is your
admin panel, and Excel export is built in (File → Download → Microsoft Excel).

Setup takes about 10 minutes.

---

## Step 1 — Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new
   blank spreadsheet.
2. Rename it something like **"Aurum Abir — Leads"**.

## Step 2 — Add the backend script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete any placeholder code in the editor.
3. Open the `Code.gs` file included in this folder, copy its full contents,
   and paste it into the Apps Script editor.
4. Click the **Save** icon (or `Ctrl/Cmd + S`).
5. In the function dropdown at the top, select `setup` and click **Run**.
   - The first time you run it, Google will ask you to authorize the
     script — click **Review permissions**, choose your Google account,
     click **Advanced**, then **Go to (project name) (unsafe)**, then
     **Allow**. This warning is normal for scripts you write yourself.
6. Go back to the Sheet — you should now see a **Leads** tab with header
   columns: Timestamp, Name, Phone, Email, Interested Configuration,
   Source, Page URL.

## Step 3 — Deploy it as a Web App

1. Back in the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** Aurum Abir lead capture
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Copy the **Web app URL** it gives you (looks like
   `https://script.google.com/macros/s/AKfycb.../exec`).
   - You'll be asked to authorize again the first time — same steps as above.

## Step 4 — Connect the landing page

1. Open `index.html` in a text editor.
2. Find this line near the bottom, inside the `<script>` tag:
   ```js
   const LEADS_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace the placeholder with the Web app URL you copied in Step 3:
   ```js
   const LEADS_ENDPOINT = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Save the file and re-upload it wherever the site is hosted.

That's it — every form submission now lands as a new row in your Sheet
within a second or two.

---

## Using the Sheet as your admin panel

- **View leads:** just open the Sheet — newest submissions are added at
  the bottom. Click the Timestamp column header to sort newest-first.
- **Filter:** select the header row → **Data → Create a filter** to filter
  by configuration (1/2/3 BHK), date range, etc.
- **Export to Excel:** **File → Download → Microsoft Excel (.xlsx)**
  (or CSV, PDF, Google Sheets natively supports all of these).
- **Share with your team:** click **Share** top-right and add teammates'
  email addresses — no extra login system needed.
- **Get notified on new leads (optional):** in the Sheet, go to
  **Tools → Notification rules** and choose "Any changes are made" to get
  an email every time a new lead comes in.

## If you ever redeploy the script

Every time you edit `Code.gs` in the Apps Script editor, you must create a
**new deployment** (Deploy → Manage deployments → pencil icon → New
version → Deploy) for the changes to go live — editing the code alone
doesn't update the running Web App.

## Troubleshooting

- **Leads aren't showing up:** double check the URL was pasted correctly
  and ends in `/exec`, not `/dev`. Also confirm "Who has access" was set
  to **Anyone** — if it's restricted, external form submissions will fail
  silently.
- **Testing it directly:** paste the Web App URL into a browser address
  bar — you should see the text "Aurum Abir lead capture endpoint is
  live." If you see a Google login/permission page instead, access isn't
  set to "Anyone" — redeploy with that setting.
