#!/usr/bin/env node

/**
 * Simple PHP Server Launcher for Render
 * This script serves as a wrapper to ensure Render recognizes this as PHP application
 */

const { exec } = require('child_process');
const path = require('path');
const os = require('os');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

console.log('🚀 Starting St Joseph\'s Technical Institute Application Server');
console.log(`📍 Server will start on ${HOST}:${PORT}`);

// For Render: We'll serve static files through a simple express server
// that also handles PHP requests

const express = require('express');
const app = express();

// Middleware
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'welcome.html'));
});

app.get('/apply', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin_dashboard.html'));
});

// Health check endpoint (Render requirement)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'STJT Application Server' });
});

// PHP Request handler (fallback)
app.post('/submit_application.php', (req, res) => {
    // In a production environment, you would:
    // 1. Connect to a database
    // 2. Send confirmation emails
    // 3. Perform additional validation
    
    const { firstName, lastName, email, programme } = req.body;
    
    if (!firstName || !lastName || !email || !programme) {
        return res.status(400).json({ 
            success: false, 
            message: 'Missing required fields' 
        });
    }

    // Generate reference number
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const referenceNumber = `STJT-${new Date().getFullYear()}-${timestamp}-${random}`;

    // For now, just return success with reference number
    // In production, save to database or file
    res.json({ 
        success: true, 
        message: 'Application submitted successfully',
        referenceNumber: referenceNumber
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'welcome.html'));
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`✅ Server running at http://${HOST}:${PORT}`);
    console.log(`📋 Application Form: http://${HOST}:${PORT}/apply`);
    console.log(`📊 Admin Dashboard: http://${HOST}:${PORT}/admin`);
    console.log(`🏠 Home Page: http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('⏸️ Server shutting down gracefully...');
    process.exit(0);
});
