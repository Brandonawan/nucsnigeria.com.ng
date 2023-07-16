const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const ejs = require("ejs");
const app = express();
// Start the server
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// connect to emailSchema.js
// const Email = require('./models/emailSchema');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Handle GET request to 
app.get('', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('index');
});

app.get('/gallery', (req, res) => {
    res.render('gallery');
});

app.get('/member', (req, res) => {
    res.render('member');
});

app.get('/news', (req, res) => {
    res.render('member');
});

app.get('/branches', (req, res) => {
    res.render('member');
});

app.get('/blog', (req, res) => {
    res.render('member');
});

app.get('/resource', (req, res) => {
    res.render('resource');
});

app.get('/event', (req, res) => {
    res.render('resource');
});

app.get('/student', (req, res) => {
    res.render('student');
});

// Endpoint to download the Excel file
app.get('/download-emails', (req, res) => {
    res.download('emails.xlsx', 'emails.xlsx');
  });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});