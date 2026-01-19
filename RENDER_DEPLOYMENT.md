# Render Deployment Guide for STJT Online Application

## ✅ Quick Setup (5 minutes)

Your application is now hosted at: **https://stjosephsttidonlineapplication.onrender.com**

## Environment Variables to Set in Render Dashboard

1. Go to your Render dashboard: https://dashboard.render.com
2. Find your Web Service: `STJTTIDonlineapplication`
3. Click **Settings** → **Environment**
4. Add these variables:

```
USE_DATABASE=false
USE_FILE_STORAGE=true
MAIL_DRIVER=php
```

## Option 1: File-Based Storage (Current Setup - Works Great!)

Your application is already configured to save submissions to files. No additional setup needed!

**What's working:**
- ✅ Form submissions saved locally
- ✅ Admin dashboard can view submissions (via localStorage)
- ✅ Instant confirmation with reference numbers
- ✅ Mobile-friendly application form

## Option 2: Database Storage (MySQL on Render)

To add a PostgreSQL or MySQL database:

1. In Render Dashboard → **Create +** → **PostgreSQL**
   - Create a new database instance
   - Copy the internal connection string

2. Add these environment variables:
   ```
   USE_DATABASE=true
   USE_FILE_STORAGE=true
   DB_HOST=your-database-host
   DB_USER=your-db-user
   DB_PASSWORD=your-secure-password
   DB_NAME=your-db-name
   ```

3. Import the database schema:
   - Use a database client to connect to your Render database
   - Run the `database_schema.sql` file to create tables

## Option 3: Email Notifications (SendGrid Recommended)

To send confirmation emails when applicants submit:

1. Sign up for SendGrid (free tier available): https://sendgrid.com
2. Get your API Key from SendGrid dashboard
3. Add environment variable in Render:
   ```
   MAIL_DRIVER=sendgrid
   SENDGRID_API_KEY=your-api-key-here
   SEND_CONFIRMATION_EMAIL=true
   ```

OR use Gmail SMTP:
```
MAIL_DRIVER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
SEND_CONFIRMATION_EMAIL=true
```

## File Structure on Render

```
/
├── index.html (Main application form)
├── welcome.html (Landing page)
├── admin_dashboard.html (Admin interface)
├── styles.css (Styling)
├── script.js (Client-side validation)
├── config.php (Configuration)
├── submit_application.php (Form handler)
├── database_schema.sql (Database setup)
├── applications/ (Submissions folder - auto-created)
├── logs/ (Log files - auto-created)
└── .env.example (Configuration template)
```

## Testing Your Deployment

1. Visit: https://stjosephsttidonlineapplication.onrender.com
2. Click "Apply Now"
3. Fill out the form with test data
4. Submit the form
5. You should see a success message with a reference number

## Common Issues & Solutions

### Issue: Form submissions not saving
**Solution:** Ensure `USE_FILE_STORAGE=true` in environment variables

### Issue: Can't see admin dashboard
**Note:** Admin dashboard uses localStorage (browser storage). Data persists only in that browser/device. To share across team, use database option.

### Issue: Need to view submissions
**Option A:** Check via admin dashboard at `/admin_dashboard.html`
**Option B:** Set up database and view in database client
**Option C:** Implement backend API for submissions retrieval

## Monitoring & Logs

Your application logs are saved in the `/logs/` folder. To view them:
1. Connect via SSH to your Render service
2. Navigate to the logs folder
3. Check `error.log` and `submission.log`

## Next Steps

1. ✅ Your site is live at https://stjosephsttidonlineapplication.onrender.com
2. Test the application form
3. (Optional) Set up database for persistent storage
4. (Optional) Set up email notifications for confirmations
5. Share the URL with applicants!

## Support

For issues or questions about the deployment:
- Check Render documentation: https://render.com/docs
- Review config.php for configuration options
- Check the logs for error messages

---

**Last Updated:** January 19, 2026
**Application Status:** ✅ Live and Ready
