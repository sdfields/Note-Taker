// Boilerplate variables

const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(express.static('public'));

app.get('/')