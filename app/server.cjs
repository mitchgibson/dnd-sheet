const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const CHARACTERS_DIR = path.join(__dirname, 'characters');

// Ensure characters directory exists
if (!fs.existsSync(CHARACTERS_DIR)) {
    fs.mkdirSync(CHARACTERS_DIR, { recursive: true });
}

app.use(cors());
app.use(express.json());

// Sanitize filename to prevent directory traversal
function sanitizeName(name) {
    return name.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 100);
}

// List all characters
app.get('/api/characters', (req, res) => {
    try {
        const files = fs.readdirSync(CHARACTERS_DIR);
        const characters = files
            .filter(f => f.endsWith('.json'))
            .map(f => {
                const filePath = path.join(CHARACTERS_DIR, f);
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                return {
                    name: data.name || f.replace('.json', ''),
                    class: data.class || '',
                    level: data.level || 1,
                    fileName: f.replace('.json', '')
                };
            });
        res.json(characters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list characters' });
    }
});

// Load a character
app.get('/api/characters/:name', (req, res) => {
    const fileName = sanitizeName(req.params.name);
    const filePath = path.join(CHARACTERS_DIR, `${fileName}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Character not found' });
    }

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Failed to load character' });
    }
});

// Save a character (only if it's a new file or same as current)
app.post('/api/characters/:name', (req, res) => {
    const fileName = sanitizeName(req.params.name);
    const filePath = path.join(CHARACTERS_DIR, `${fileName}.json`);
    const currentFileName = req.query.current; // Pass current file name to allow updating same file

    // If file exists and it's not our current file, reject to prevent overwrite
    if (fs.existsSync(filePath) && currentFileName && sanitizeName(currentFileName) !== fileName) {
        return res.status(409).json({ error: 'A character with this name already exists', exists: true });
    }

    try {
        fs.writeFileSync(filePath, JSON.stringify(req.body, null, 2));
        res.json({ success: true, fileName });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save character' });
    }
});

// Rename a character file
app.post('/api/characters/:oldName/rename/:newName', (req, res) => {
    const oldFileName = sanitizeName(req.params.oldName);
    const newFileName = sanitizeName(req.params.newName);
    const oldPath = path.join(CHARACTERS_DIR, `${oldFileName}.json`);
    const newPath = path.join(CHARACTERS_DIR, `${newFileName}.json`);

    // Check if old file exists
    if (!fs.existsSync(oldPath)) {
        return res.status(404).json({ error: 'Original character not found' });
    }

    // Check if new name already exists (and it's not the same file)
    if (oldFileName !== newFileName && fs.existsSync(newPath)) {
        return res.status(409).json({ error: 'A character with this name already exists', exists: true });
    }

    try {
        // Read, update name in data, write to new file, delete old
        const data = JSON.parse(fs.readFileSync(oldPath, 'utf8'));
        data.name = req.body.name || data.name;
        Object.assign(data, req.body); // Merge any updates

        fs.writeFileSync(newPath, JSON.stringify(data, null, 2));

        // Delete old file if name changed
        if (oldFileName !== newFileName) {
            fs.unlinkSync(oldPath);
        }

        res.json({ success: true, fileName: newFileName });
    } catch (error) {
        res.status(500).json({ error: 'Failed to rename character' });
    }
});

// Check if a character name exists
app.get('/api/characters/:name/exists', (req, res) => {
    const fileName = sanitizeName(req.params.name);
    const filePath = path.join(CHARACTERS_DIR, `${fileName}.json`);
    res.json({ exists: fs.existsSync(filePath), fileName });
});

// Delete a character
app.delete('/api/characters/:name', (req, res) => {
    const fileName = sanitizeName(req.params.name);
    const filePath = path.join(CHARACTERS_DIR, `${fileName}.json`);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Character not found' });
    }

    try {
        fs.unlinkSync(filePath);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete character' });
    }
});

app.listen(PORT, () => {
    console.log(`Character API server running at http://localhost:${PORT}`);
    console.log(`Saving characters to: ${CHARACTERS_DIR}`);
});
