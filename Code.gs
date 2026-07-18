/**
 * AURUM ABIR — LEAD CAPTURE BACKEND
 * ----------------------------------
 * This script turns a Google Sheet into the backend + admin panel
 * for the landing page enquiry form.
 *
 * Every form submission becomes a new row. The Sheet itself is your
 * admin panel — sort it, filter it, and export it to Excel any time
 * via File > Download > Microsoft Excel (.xlsx).
 *
 * SETUP — see SETUP-GOOGLE-SHEET.md for the full step-by-step guide.
 */

const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const sheet = getLeadsSheet_();
    const p = e.parameter;

    sheet.appendRow([
      new Date(),                        // Timestamp
      p.name || '',                      // Full Name
      p.phone || '',                     // Phone Number
      p.email || '',                     // Email Address
      p.config || '',                    // Interested Configuration
      p.source || 'Website',             // Source
      p.page_url || ''                   // Page URL
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you sanity-check the deployment by opening the Web App URL directly in a browser.
function doGet(e) {
  return ContentService
    .createTextOutput('Aurum Abir lead capture endpoint is live. POST form data here.')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Creates the "Leads" tab with headers if it doesn't exist yet.
function getLeadsSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Interested Configuration', 'Source', 'Page URL']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, 7);
  }
  return sheet;
}

// Run this once manually from the Apps Script editor to set up headers
// before your first real submission (optional — doPost creates them too).
function setup() {
  getLeadsSheet_();
}
