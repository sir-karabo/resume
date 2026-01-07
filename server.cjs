const express = require('express');
const sqlite3 = require('better-sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'database.sqlite');

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Initialize DB
const db = sqlite3(DB_PATH);

// Create Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS site_data (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    password TEXT
  );
`);

// Seed Data if empty
const seedData = () => {
    const resumeStmt = db.prepare('SELECT value FROM site_data WHERE key = ?');
    if (!resumeStmt.get('resume')) {
        const resumePath = path.join(__dirname, 'src', 'data', 'resume.json');
        if (fs.existsSync(resumePath)) {
            const resumeData = fs.readFileSync(resumePath, 'utf8');
            db.prepare('INSERT INTO site_data (key, value) VALUES (?, ?)').run('resume', resumeData);
            console.log('Seeded resume data');
        }
    }

    if (!resumeStmt.get('projects')) {
        const projectsPath = path.join(__dirname, 'src', 'data', 'projects.json');
        if (fs.existsSync(projectsPath)) {
            const projectsData = fs.readFileSync(projectsPath, 'utf8');
            db.prepare('INSERT INTO site_data (key, value) VALUES (?, ?)').run('projects', projectsData);
            console.log('Seeded projects data');
        }
    }

    const userStmt = db.prepare('SELECT username FROM users WHERE username = ?');
    if (!userStmt.get('admin')) {
        db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', '1234');
        console.log('Seeded admin user');
    }
};

seedData();

// Middleware for simulated auth (in a real app, use JWT/Sessions)
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === 'Bearer admin-token') {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Routes

// Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
    const user = stmt.get(username, password);

    if (user) {
        res.json({ token: 'admin-token', username: user.username });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Get Data
app.get('/api/data/:key', (req, res) => {
    const { key } = req.params;
    const stmt = db.prepare('SELECT value FROM site_data WHERE key = ?');
    const row = stmt.get(key);
    if (row) {
        res.json(JSON.parse(row.value));
    } else {
        res.status(404).json({ error: 'Key not found' });
    }
});

// Update Data (Protected)
app.post('/api/data/:key', requireAuth, (req, res) => {
    const { key } = req.params;
    const value = JSON.stringify(req.body);

    // Create or Replace
    const stmt = db.prepare('INSERT OR REPLACE INTO site_data (key, value) VALUES (?, ?)');
    stmt.run(key, value);

    // Also update the file system for persistence in the repo
    const filePath = path.join(__dirname, 'src', 'data', `${key}.json`);
    try {
        fs.writeFileSync(filePath, JSON.stringify(req.body, null, 4));
        res.json({ success: true });
    } catch (err) {
        console.error('Error writing file:', err);
        res.status(500).json({ error: 'Failed to save file' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
