// Boilerplate variables

const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');

const PORT = 3001;

// Initialize express

const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({extended: true }));
// app.use('/api', api);
app.use(express.static('public'));

// Get route for landing page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET route for notes

app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for api/notes
app.get('/api/notes', (req, res) => {
    res.json(db)
});

app.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);