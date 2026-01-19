/* ============================================
   ST JOSEPH'S TECHNICAL INSTITUTE FORM SCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateForm()) {
            submitForm();
        }
    });

    // Add real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
});

/**
 * Validate entire form
 */
function validateForm() {
    const form = document.getElementById('applicationForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field) {
    let isValid = true;
    let errorMessage = '';

    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    // Email validation
    else if (field.type === 'email' && field.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    // Phone validation
    else if (field.type === 'tel' && field.value) {
        const phonePattern = /^[\d\s\-\+\(\)]+$/;
        if (!phonePattern.test(field.value) || field.value.replace(/\D/g, '').length < 9) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    // Date validation (ensure date is not in future)
    else if (field.type === 'date' && field.value) {
        if (field.id === 'dob') {
            const dob = new Date(field.value);
            const today = new Date();
            if (dob > today) {
                isValid = false;
                errorMessage = 'Date of birth cannot be in the future';
            } else {
                const age = today.getFullYear() - dob.getFullYear();
                if (age < 16) {
                    isValid = false;
                    errorMessage = 'You must be at least 16 years old to apply';
                }
            }
        } else if (field.id === 'startDate') {
            const startDate = new Date(field.value);
            const today = new Date();
            if (startDate < today) {
                isValid = false;
                errorMessage = 'Start date cannot be in the past';
            }
        }
    }
    // Number validation
    else if (field.type === 'number' && field.value) {
        if (isNaN(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid number';
        }
    }

    // Display or clear error
    displayFieldError(field, isValid, errorMessage);
    return isValid;
}

/**
 * Display error message for field
 */
function displayFieldError(field, isValid, errorMessage) {
    let errorElement = field.nextElementSibling;
    
    // Remove existing error element if any
    if (errorElement && errorElement.classList && errorElement.classList.contains('field-error')) {
        errorElement.remove();
    }

    if (!isValid) {
        const error = document.createElement('span');
        error.className = 'field-error';
        error.style.cssText = `
            color: #c0392b;
            font-size: 0.85em;
            margin-top: 5px;
            display: block;
        `;
        error.textContent = errorMessage;
        field.parentNode.insertBefore(error, field.nextSibling);
        field.style.borderColor = '#c0392b';
    } else {
        field.style.borderColor = '';
    }
}

/**
 * Submit form
 */
function submitForm() {
    const form = document.getElementById('applicationForm');
    const formData = new FormData(form);

    // Convert form data to object
    const applicationData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        dob: formData.get('dob'),
        gender: formData.get('gender'),
        idNumber: formData.get('idNumber'),
        address: formData.get('address'),
        city: formData.get('city'),
        county: formData.get('county'),
        postalCode: formData.get('postalCode'),
        emergencyName: formData.get('emergencyName'),
        emergencyPhone: formData.get('emergencyPhone'),
        relationship: formData.get('relationship'),
        lastSchool: formData.get('lastSchool'),
        graduationYear: formData.get('graduationYear'),
        qualification: formData.get('qualification'),
        certificates: formData.get('certificates'),
        programme: formData.get('programme'),
        programmeLevel: formData.get('programmeLevel'),
        startDate: formData.get('startDate'),
        disabilityType: formData.get('disabilityType'),
        supportNeeds: formData.get('supportNeeds'),
        signLanguage: formData.get('signLanguage'),
        motivation: formData.get('motivation'),
        goals: formData.get('goals'),
        referral: formData.get('referral'),
        submittedAt: new Date().toISOString()
    };

    // Log data (in production, send to server)
    console.log('Application Data:', applicationData);

    // For demonstration, save to localStorage
    try {
        // Generate reference number
        const refNumber = generateReferenceNumber();
        applicationData.referenceNumber = refNumber;

        // Save to localStorage
        const applications = JSON.parse(localStorage.getItem('applications')) || [];
        applications.push(applicationData);
        localStorage.setItem('applications', JSON.stringify(applications));

        // Show success message
        showSuccessMessage(refNumber);

        // Optional: Send to server
        // sendToServer(applicationData);

    } catch (error) {
        console.error('Error saving application:', error);
        alert('An error occurred while submitting your application. Please try again.');
    }
}

/**
 * Generate unique reference number
 */
function generateReferenceNumber() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `STJT-${new Date().getFullYear()}-${timestamp}-${random}`;
}

/**
 * Show success message
 */
function showSuccessMessage(refNumber) {
    const formWrapper = document.querySelector('.form-wrapper');
    const successMessage = document.getElementById('successMessage');
    const refNumberElement = document.getElementById('refNumber');

    // Set reference number
    refNumberElement.textContent = refNumber;

    // Hide form and show success message
    formWrapper.style.display = 'none';
    successMessage.style.display = 'flex';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Send data to server (Optional - uncomment when backend is ready)
 */
function sendToServer(data) {
    fetch('submit_application.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(data.referenceNumber);
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting your application. Please try again.');
    });
}

/**
 * Dynamic programme options (expandable based on actual programmes)
 */
function updateProgrammeOptions() {
    const programmes = {
        'electrical': 'Electrical Installation & Maintenance',
        'plumbing': 'Plumbing & Pipe Fitting',
        'carpentry': 'Carpentry & Joinery',
        'masonry': 'Masonry & Concrete Work',
        'welding': 'Welding & Metal Fabrication',
        'motor': 'Motor Vehicle Mechanics',
        'hospitality': 'Hospitality & Catering',
        'ict': 'Information & Communication Technology',
        'business': 'Business Studies',
        'tailoring': 'Tailoring & Fashion Design'
    };
    
    return programmes;
}

/**
 * Auto-calculate age from date of birth
 */
document.addEventListener('DOMContentLoaded', function() {
    const dobInput = document.getElementById('dob');
    
    if (dobInput) {
        dobInput.addEventListener('change', function() {
            if (this.value) {
                const dob = new Date(this.value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                const monthDiff = today.getMonth() - dob.getMonth();
                
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                    age--;
                }
                
                console.log('Calculated Age:', age);
            }
        });
    }
});

/**
 * Handle file uploads if needed (optional)
 */
function handleFileUpload(fileInput) {
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file.size > maxSize) {
            alert('File size exceeds 5MB limit');
            fileInput.value = '';
            return false;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a valid file type (JPG, PNG, or PDF)');
            fileInput.value = '';
            return false;
        }

        return true;
    }
}
