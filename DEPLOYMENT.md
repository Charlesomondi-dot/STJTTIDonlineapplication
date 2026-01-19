# Deployment Guide - St Joseph's Technical Institute Application Form

## 🚀 Deployment Options

### Option 1: Static Website Hosting (Simplest - No Backend)

**Best for:** Quick deployment, low cost, testing

**Platforms:**
- GitHub Pages (Free)
- Netlify (Free tier available)
- Vercel (Free tier available)
- AWS S3 + CloudFront
- Firebase Hosting

**How to Deploy to GitHub Pages:**
1. Create GitHub account at https://github.com
2. Create new repository: `stjtech-application`
3. Upload all files except `.php` files
4. Go to Settings → Pages
5. Select "Deploy from a branch" → main
6. Your form is live at: `https://yourusername.github.io/stjtech-application/`

**Limitations:**
- No backend processing
- Data stored in browser localStorage only
- No email notifications
- Admin dashboard limited to local viewing

---

### Option 2: Traditional Web Host (With PHP Support)

**Best for:** Full functionality, email, database, admin panel

**Recommended Hosts:**
- Bluehost ($2.95-8.95/month)
- HostGator ($2.75-5.95/month)
- DreamHost ($2.59+/month)
- Africa Hosting (local option)

**Upload Steps:**
1. Get FTP/SFTP credentials from host
2. Use FileZilla (free) to connect
3. Upload all files to `public_html` folder
4. Create database in cPanel
5. Edit `config.php` with database details
6. Edit `submit_application.php` to enable database
7. Run `database_schema.sql` to create tables

**Access your form:**
```
http://yourdomain.com/OnlineStjttid%20Application/index.html
```

---

### Option 3: Docker Container (Advanced)

**Best for:** Scalable, consistent environments

**Requirements:**
- Docker installed
- Docker Hub account

**Create Dockerfile:**
```dockerfile
FROM php:7.4-apache

WORKDIR /var/www/html

COPY . .

RUN chmod 755 /var/www/html/applications
RUN chmod 755 /var/www/html/logs
RUN chmod 755 /var/www/html/uploads

RUN docker-php-ext-install mysqli
RUN a2enmod rewrite

EXPOSE 80

CMD ["apache2-foreground"]
```

**Build and Run:**
```bash
docker build -t stjtech-application .
docker run -p 80:80 -v ./applications:/var/www/html/applications stjtech-application
```

---

### Option 4: Cloud Platforms

#### AWS EC2
```bash
# Launch Ubuntu instance
sudo apt-get update
sudo apt-get install apache2 php libapache2-mod-php php-mysql mysql-server
# Upload files via SCP or EC2 Instance Connect
```

#### Google Cloud Platform
```bash
# Use App Engine or Cloud Run
# Automatic scaling, pay-per-use
```

#### Azure App Service
1. Create Web App
2. Deploy via Git or ZIP upload
3. Configure Application settings

---

## 🔧 Pre-Deployment Checklist

### Security
- [ ] Change all default passwords
- [ ] Set database user permissions (not root)
- [ ] Enable HTTPS/SSL certificate
- [ ] Set file permissions to 644 (files), 755 (folders)
- [ ] Remove `.php` files from public view if not needed
- [ ] Add rate limiting to prevent spam
- [ ] Validate all form inputs
- [ ] Sanitize all database queries

### Configuration
- [ ] Update `config.php` with correct settings
- [ ] Update institution contact information
- [ ] Add all programmes offered
- [ ] Set correct timezone
- [ ] Enable/disable features as needed
- [ ] Configure email settings (SMTP/SendGrid)
- [ ] Set up database connection
- [ ] Test database connection

### Content
- [ ] Verify all form fields are correct
- [ ] Update privacy policy
- [ ] Update terms of service
- [ ] Add contact information
- [ ] Add help/FAQ section
- [ ] Review mobile responsiveness
- [ ] Test on different browsers

### Performance
- [ ] Minify CSS and JavaScript
- [ ] Optimize images
- [ ] Enable gzip compression
- [ ] Set up caching headers
- [ ] Test form submission speed
- [ ] Monitor database queries

### Backups
- [ ] Set up automated backups
- [ ] Test backup restoration
- [ ] Store backups securely
- [ ] Document backup procedure

---

## 📧 Email Configuration

### Using Gmail SMTP
In `config.php`:
```php
define('MAIL_DRIVER', 'smtp');
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@gmail.com');
define('SMTP_PASSWORD', 'your-app-password');
```

**Get Gmail App Password:**
1. Enable 2-Factor Authentication
2. Go to https://myaccount.google.com/apppasswords
3. Generate new app password
4. Use this password (not your Gmail password)

### Using SendGrid
```php
define('MAIL_DRIVER', 'sendgrid');
define('SENDGRID_API_KEY', 'SG.xxxxx');
```

1. Sign up at https://sendgrid.com
2. Create API key
3. Add to config.php

---

## 🗄️ Database Setup

### Quick Setup (if using hosting provider's cPanel)
1. Go to cPanel → MySQL Databases
2. Create new database: `stjtech_applications`
3. Create new user with password
4. Add user to database with all privileges
5. Go to phpMyAdmin
6. Import `database_schema.sql`
7. Update `config.php` with credentials

### Manual MySQL Setup
```bash
# Connect to MySQL
mysql -u root -p

# Create database
CREATE DATABASE stjtech_applications;

# Create user
CREATE USER 'stjtech_user'@'localhost' IDENTIFIED BY 'secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON stjtech_applications.* TO 'stjtech_user'@'localhost';
FLUSH PRIVILEGES;

# Exit
EXIT;

# Import schema
mysql -u stjtech_user -p stjtech_applications < database_schema.sql
```

---

## 🌐 Domain & DNS Setup

### Using a Custom Domain
1. Register domain (Namecheap, GoDaddy, etc.)
2. Point DNS to your host:
   - For GitHub Pages: Add CNAME record
   - For other hosts: Update nameservers

### Example DNS Records for Web Host
```
Type: A
Name: @
Value: xxx.xxx.xxx.xxx (your host's IP)

Type: CNAME
Name: www
Value: yourdomain.com
```

---

## 🔐 SSL Certificate Setup

### Free SSL with Let's Encrypt
```bash
# On Ubuntu/Debian
sudo apt-get install certbot python3-certbot-apache
sudo certbot certonly --apache -d yourdomain.com
sudo certbot renew
```

### Auto-renew HTTPS
```bash
# Check renewal status
sudo certbot renew --dry-run

# Auto-renewal via cron
0 12 * * * /usr/bin/certbot renew --quiet
```

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring
```php
// Add to config.php to monitor issues
error_log('Application error: ' . $e->getMessage(), 3, '/var/log/app-error.log');
```

### Regular Tasks (Daily/Weekly/Monthly)

**Daily:**
- Check new applications
- Review error logs
- Verify system is running

**Weekly:**
- Back up database
- Review statistics
- Respond to applicants

**Monthly:**
- Full backup
- Update software
- Review security logs
- Performance review

### Automated Tasks

**Set up cron jobs:**
```bash
# Back up database daily
0 2 * * * /home/user/backup-db.sh

# Send notification emails
0 9 * * * php /var/www/html/send-notifications.php

# Clean old files
0 1 * * 0 /home/user/cleanup.sh
```

---

## 🔄 Updates & Maintenance

### Keeping Software Updated
1. Check PHP version regularly
2. Update MySQL/MariaDB
3. Keep WordPress plugins updated (if using)
4. Monitor security patches

### Testing After Updates
```bash
# Test PHP compatibility
php -v
php -m

# Test database connection
php test-db.php

# Test form submission
# Visit form and submit test application
```

---

## 📱 Mobile Optimization Verification

- [ ] Form displays correctly on smartphones
- [ ] Touch buttons are large enough
- [ ] Keyboard input works properly
- [ ] Submission works on mobile
- [ ] Admin dashboard mobile-friendly
- [ ] No horizontal scrolling needed

---

## 📈 Scaling Strategies

As your form gets more traffic:

1. **Add caching** (Redis, Memcached)
2. **Load balancing** (multiple servers)
3. **Database optimization** (indexes, queries)
4. **Content delivery** (CDN for static files)
5. **Email queue** (background processing)

---

## 🆘 Troubleshooting Common Issues

### "503 Service Unavailable"
- Check server resources
- Review error logs
- Increase PHP memory limit

### Database Connection Error
- Verify credentials in config.php
- Check database server status
- Verify user permissions

### Email Not Sending
- Verify SMTP credentials
- Check firewall/port settings
- Test with simple email first
- Review error logs

### Slow Form Submission
- Check database queries
- Add indexes to tables
- Review server resources
- Enable caching

---

## 📞 Support & Resources

### Technical Support
- Contact your hosting provider
- PHP documentation: https://www.php.net
- MySQL documentation: https://dev.mysql.com
- Security guides: https://owasp.org

### Backup Service Recommendations
- Backblaze ($7/month)
- Acronis ($50+/year)
- IDrive ($70/year)

---

## ✅ Post-Deployment Checklist

- [ ] Form accessible at correct URL
- [ ] SSL certificate working (https)
- [ ] Database saving applications
- [ ] Email notifications sending
- [ ] Admin dashboard accessible
- [ ] Mobile version working
- [ ] All browsers tested
- [ ] Performance acceptable
- [ ] Security verified
- [ ] Backups running
- [ ] Monitor set up
- [ ] Team trained on system

---

**Deployment Complete!** Your application form is now live and ready for applicants.

For ongoing support and maintenance, refer to the main README.md file.
