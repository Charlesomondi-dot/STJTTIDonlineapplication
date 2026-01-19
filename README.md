# St Joseph's Technical Institute - Online Application Form

A comprehensive online application form system for St Joseph's Technical Institute for the Deaf in Nyang'oma, Kenya.

## 📋 Features

- **Professional Design**: Clean, modern, and accessible interface
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Comprehensive Forms**: Captures all necessary information for program applications
- **Client-Side Validation**: Real-time form validation with user-friendly error messages
- **Multiple Sections**: Organized into logical sections including:
  - Personal Information
  - Contact & Address Information
  - Emergency Contact
  - Educational Background
  - Programme Selection
  - Disability Information (specialized for deaf students)
  - Employment History
  - Additional Information
  - Terms & Conditions

- **Data Management**: 
  - Local storage for quick testing
  - PHP backend for server-side processing (optional)
  - Email confirmation (configurable)
  - Unique reference numbers for each application

## 🚀 Quick Start

### Option 1: Local Development (No Server Required)

1. Open `index.html` in a modern web browser
2. Fill out the form with your information
3. Click "Submit Application"
4. View your submitted data in browser's local storage

### Option 2: With PHP Server

1. Place all files in your web server's document root
2. Access via: `http://localhost/OnlineStjttid%20Application/index.html`
3. Configure database connection in `submit_application.php` (optional)
4. Form submissions will be saved to `applications/` folder or database

## 📁 File Structure

```
OnlineStjttid Application/
├── index.html              # Main form page
├── styles.css              # Styling and responsive design
├── script.js               # Form validation and JavaScript logic
├── submit_application.php  # Backend form processing (optional)
├── README.md               # This file
└── applications/           # Directory for saved applications (created automatically)
```

## 📝 Form Sections

### 1. Personal Information
- First Name & Last Name
- Email & Phone Number
- Date of Birth
- Gender
- ID/Passport Number

### 2. Contact & Address
- Residential Address
- City/Town
- County
- Postal Code

### 3. Emergency Contact
- Contact Person Name & Phone
- Relationship

### 4. Educational Background
- Last School Attended
- Year of Graduation
- Highest Qualification
- Relevant Certificates

### 5. Programme Selection
- Programme Choice (10+ options available)
- Programme Level
- Preferred Start Date

### 6. Disability Information
- Type of Hearing Impairment
- Special Support Needs
- Sign Language Experience

### 7. Employment History
- Current Employment Status
- Job Title
- Years of Experience

### 8. Additional Information
- Motivation for Applying
- Career/Personal Goals
- How you heard about us

## 🔧 Customization

### Change Contact Information
Edit the footer in `index.html`:
```html
<p>Contact us: info@stjosephstechnical.ac.ke | Phone: +254 (0) 123 456 789</p>
```

### Add/Modify Programmes
Edit the programme dropdown in `index.html`:
```html
<option value="electrical">Electrical Installation & Maintenance</option>
<option value="plumbing">Plumbing & Pipe Fitting</option>
<!-- Add more options -->
```

### Customize Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #003d7a;
    --secondary-color: #e74c3c;
    --accent-color: #27ae60;
    /* ... more variables */
}
```

## 🔐 Data Security

- Email validation using standard patterns
- Phone number validation
- HTML sanitization on submission
- Date validation
- Form field requirements enforcement
- Client-side CSRF protection can be added

## 💾 Data Storage

### Client-Side (Default)
- Data stored in browser's localStorage
- View with: `localStorage.getItem('applications')`
- Clear with: `localStorage.clear()`

### Server-Side (with PHP)
- Uncomment database functions in `submit_application.php`
- Configure MySQL connection details
- Applications saved with unique reference numbers

## 📧 Email Notifications

The system can send confirmation emails. To enable:

1. Uncomment the `sendConfirmationEmail()` call in `submit_application.php`
2. Configure your mail server (sendmail/SMTP)
3. Ensure PHP mail function is enabled on your server

## 🌐 Deployment

### For Static Hosting (GitHub Pages, Netlify, etc.)
- All files work with local storage
- No backend processing needed
- Mobile-friendly and responsive

### For Traditional Web Server
1. Upload all files to your server
2. Ensure PHP is enabled (if using backend)
3. Create an `applications/` folder with write permissions
4. Configure database if needed

### For Containerized Deployment
```dockerfile
FROM php:7.4-apache
COPY . /var/www/html/
RUN chmod 777 /var/www/html/applications/
```

## ✅ Form Validation

The system validates:
- ✓ Required fields
- ✓ Email format
- ✓ Phone number format
- ✓ Date validity (not future for DOB)
- ✓ Age requirement (minimum 16 years)
- ✓ Terms and conditions acceptance

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Opera 47+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Accessibility Features

- Semantic HTML5 structure
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance (WCAG 2.1)
- Focus indicators for keyboard users
- Mobile-friendly touch targets

## 🐛 Troubleshooting

### Form won't submit
- Check browser console for JavaScript errors
- Verify all required fields are filled
- Ensure browser supports HTML5 form validation

### Email not sending
- Check PHP mail function is enabled
- Verify mail server configuration
- Check email address is valid
- Review server error logs

### Data not saving
- For localStorage: Check browser's storage quota
- For files: Verify folder permissions
- For database: Check database connection details

## 📞 Support & Maintenance

For issues or feature requests related to this form:
1. Check the troubleshooting section
2. Review form validation rules in `script.js`
3. Check backend configuration in `submit_application.php`

## 📄 License

This form system is provided for St Joseph's Technical Institute for the Deaf.

## 🔄 Version History

- **v1.0** (January 2026) - Initial release with comprehensive form and validation

---

**St Joseph's Technical Institute for the Deaf - Nyang'oma**  
Making Technical Education Accessible to All
