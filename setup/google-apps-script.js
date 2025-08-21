/**
 * Google Apps Script for RoomsCarolina Form Submissions
 * 
 * Setup Instructions:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a Google Sheet to store submissions
 * 5. Replace SHEET_ID below with your sheet ID
 * 6. Deploy as web app with execute permissions for "Anyone"
 * 7. Copy the deployment URL and update your website
 */

// Configuration
const SHEET_ID = 'YOUR_SHEET_ID_HERE'; // Replace with your Google Sheet ID
const SHEET_NAME = 'Form Submissions'; // Name of the sheet tab

/**
 * Main function that handles POST requests from the form
 */
function doPost(e) {
  try {
    // Parse the form data from FormData
    let data;
    if (e.postData && e.postData.contents) {
      // If it's JSON data
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      // If it's FormData with 'data' parameter
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('No data received');
    }
    
    // Log the submission for debugging
    console.log('Received form submission:', data);
    
    // Save to Google Sheet
    const result = saveToSheet(data);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Application submitted successfully!',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      });
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'There was an error processing your application. Please try again.',
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      });
  }
}

/**
 * Handle GET requests (for testing) and OPTIONS requests for CORS preflight
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'RoomsCarolina Form Handler is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
}

/**
 * Handle preflight requests for CORS
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
}

/**
 * Save form data to Google Sheet
 */
function saveToSheet(data) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it with headers
    if (!sheet) {
      const newSheet = SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);
      const headers = [
        'Timestamp',
        'Areas of Interest',
        'Name',
        'Email',
        'Phone',
        'Date of Birth',
        'Desired Move-in Date',
        'Monthly Income',
        'Credit Score',
        'Co-signer Available',
        'Pets',
        'Felonies',
        'Evictions',
        'Smoking',
        'Additional Info'
      ];
      newSheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      newSheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    
    const targetSheet = sheet || SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    
    // Prepare row data
    const rowData = [
      new Date().toLocaleString(), // Timestamp
      Array.isArray(data.areas) ? data.areas.join(', ') : data.areas || '', // Areas
      data.name || '',
      data.email || '',
      data.phone || '',
      data.dob || '',
      data.moveInDate || '',
      data.income || '',
      data.creditScore || '',
      data.cosigner || '',
      data.pets || '',
      data.felonies || '',
      data.evictions || '',
      data.smoking || '',
      data.additionalInfo || ''
    ];
    
    // Add row to sheet
    targetSheet.appendRow(rowData);
    
    console.log('Successfully saved to sheet');
    return { success: true };
    
  } catch (error) {
    console.error('Error saving to sheet:', error);
    throw new Error('Failed to save to Google Sheet: ' + error.toString());
  }
}

/**
 * Test function to verify setup (run this manually to test)
 */
function testSetup() {
  console.log('Testing Google Apps Script setup...');
  
  // Test data
  const testData = {
    areas: ['Downtown', 'University Area'],
    name: 'Test User',
    email: 'test@example.com',
    phone: '123-456-7890',
    dob: '1990-01-01',
    moveInDate: '2024-01-01',
    income: '3000',
    creditScore: '750',
    cosigner: 'No',
    pets: 'No',
    felonies: '0',
    evictions: '0',
    smoking: 'No',
    additionalInfo: 'This is a test submission'
  };
  
  try {
    const result = saveToSheet(testData);
    console.log('Test successful:', result);
    return 'Setup test completed successfully!';
  } catch (error) {
    console.error('Test failed:', error);
    return 'Setup test failed: ' + error.toString();
  }
}
