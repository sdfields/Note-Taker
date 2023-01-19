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
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static('public'));

// GET request for notes

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for api/notes (database)
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if (error) {
      res.json(error);
    } else {
      data = JSON.parse(data);
      res.json(data);
    }
  });
});

// POST request for notes

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if (error) {
      res.json(error);
    } else {
      data = JSON.parse(data);
      newNote.id = Math.floor(Math.random()*1000)
      data.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(data), (error) => {
        if (error) {
          res.json(error);
        } else {
          res.json('Note added!');
        }
      });
    }
  });
});

// Delete request for notes

app.delete('/api/notes/:id', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (error, data) => {
    if (error) {
      res.json(error)
    } else {
      res.json('Note deleted!')
    }
    let notes = JSON.parse(data)
    let newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
    fs.writeFile('./db/db.json', JSON.stringify(newNotes), (error) => {
      if (error) {
        res.json(error);
      } else {
        res.json('Note deleted!');
      }
    });
  })
});

// GET request for landing page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Listen to PORT variable
app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
