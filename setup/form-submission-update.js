// Updated form submission code for RoomsCarolina website
// Replace the current form submission logic with this code

// Configuration - Replace with your Google Apps Script deployment URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

// Updated form submission handler
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    submitSpinner.style.display = 'block';

    // Collect form data
    const formData = new FormData(form);
    const data = {};

    // Handle areas (multiple checkboxes)
    const selectedAreas = [];
    document.querySelectorAll('input[name="areas"]:checked').forEach(checkbox => {
        if (checkbox.value === 'other' && otherAreaText.value.trim()) {
            selectedAreas.push(otherAreaText.value.trim());
        } else if (checkbox.value !== 'other') {
            selectedAreas.push(checkbox.value);
        }
    });
    data.areas = selectedAreas;

    // Handle other form fields
    for (let [key, value] of formData.entries()) {
        if (key !== 'areas' && key !== 'otherArea') {
            data[key] = value;
        }
    }

    // Add timestamp
    data.timestamp = new Date().toISOString();

    try {
        console.log('Submitting form data:', data);

        // Submit to Google Apps Script
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const result = await response.json();

        if (result.success) {
            // Show success state
            formFields.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Optional: Reset form for future submissions
            // form.reset();
            
            console.log('Form submitted successfully:', result);
        } else {
            throw new Error(result.message || 'Submission failed');
        }

    } catch (error) {
        console.error('Submission error:', error);

        // Reset button state on error
        submitBtn.disabled = false;
        submitText.style.display = 'block';
        submitSpinner.style.display = 'none';

        // Show user-friendly error message
        let errorMessage = 'There was an error submitting your application. Please try again.';
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Network error. Please check your internet connection and try again.';
        } else if (error.message.includes('CORS')) {
            errorMessage = 'There was a technical issue. Please try refreshing the page and submitting again.';
        }

        alert(errorMessage);
    }
});

// Additional helper function for better error handling
function handleSubmissionError(error) {
    console.error('Detailed submission error:', error);
    
    // Log error details for debugging
    const errorDetails = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };
    
    console.log('Error details for debugging:', errorDetails);
    
    // Reset form state
    submitBtn.disabled = false;
    submitText.style.display = 'block';
    submitSpinner.style.display = 'none';
}

// Function to test the connection to Google Apps Script
async function testConnection() {
    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ test: true }),
            mode: 'cors'
        });
        
        const result = await response.json();
        console.log('Connection test result:', result);
        return result.success;
    } catch (error) {
        console.error('Connection test failed:', error);
        return false;
    }
}
