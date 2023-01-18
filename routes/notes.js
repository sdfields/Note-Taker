// Variables and Imports
const notes = require('express').Router();

// GET Route for Notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request received for notes.`);
})
