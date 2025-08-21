# Google Apps Script Setup Guide for RoomsCarolina

## Overview
This guide will help you set up Google Apps Script to handle form submissions from your RoomsCarolina website. The setup will:
- Save all form submissions to a Google Sheet
- Provide a secure backend for your form

## Step-by-Step Setup

### 1. Create a Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "RoomsCarolina Applications"
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example URL: `https://docs.google.com/spreadsheets/d/1ABC123xyz/edit#gid=0`
   - Sheet ID: `1ABC123xyz`

### 2. Set up Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Delete the default `function myFunction() {}` code
4. Copy and paste the entire contents of `google-apps-script.js` from this folder
5. Replace the configuration variable at the top:
   ```javascript
   const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // Paste your Sheet ID here
   ```

### 3. Test the Setup
1. In the Apps Script editor, select the `testSetup` function from the dropdown
2. Click the "Run" button (▶️)
3. Grant permissions when prompted:
   - Allow access to Google Sheets
4. Check the execution log to confirm success
5. Verify that a test row was added to your Google Sheet

### 4. Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following options:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click "Deploy"
5. Copy the deployment URL (it will look like: `https://script.google.com/macros/s/ABC123/exec`)

### 5. Update Your Website
The deployment URL from step 4 needs to be added to your website's JavaScript code.

**Important**: Save your deployment URL - you'll need it for the next step!

## Security Notes
- The script only accepts POST requests with JSON data
- All form data is validated before processing
- The script includes CORS headers for web compatibility
- Your email notifications will only include submitted data

## Troubleshooting

### Common Issues:
1. **"Access denied" errors**: Make sure you've granted all permissions
2. **Sheet not found**: Double-check your Sheet ID
3. **CORS errors**: The script includes proper CORS headers

### Testing:
- Use the `testSetup` function to verify everything works
- Check the Apps Script execution log for detailed error messages
- Test with a small form submission first

## Data Privacy
- All data is stored in your personal Google Sheet
- No data is shared with third parties
- You maintain full control over the data

## Next Steps
Once you've completed the setup and have your deployment URL, let me know and I'll update your website to use the new backend!
