const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const XLSX = require('xlsx');
const { validationResult } = require('express-validator');

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
const Email = require('./models/emailSchema');


// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Handle GET request to 
app.get('', (req, res) => {
  res.render('home', { error: null, message: null });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/gallery', (req, res) => {
    res.render('gallery');
});

app.get('/member', (req, res) => {
    res.render('member');
});

app.get('/news', (req, res) => {
    res.render('news');
});

app.get('/branches', (req, res) => {
    res.render('branches');
});

app.get('/blog', (req, res) => {
    res.render('blog');
});

app.get('/resource', (req, res) => {
    res.render('resource');
});

app.get('/event', (req, res) => {
    res.render('event');
});

app.get('/student', (req, res) => {
    res.render('student');
});

app.get('/team', (req, res) => {
    res.render('team');
});

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/tables', (req, res) => {
  res.render('tables');
});
  // Handle newsletter submission
  app.post('/newsletter', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: null, error: 'Email is required' });
      }
  
      const existingEmail = await Email.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already submitted', error: null });
      }
  
      const userEmail = await Email.create({ email });
  
      let workbook;
      try {
        workbook = XLSX.readFile('emails.xlsx');
      } catch (error) {
        // File doesn't exist, create a new workbook with a sheet
        workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([]), 'Emails');
      }
  
      const worksheet = workbook.Sheets['Emails'];
  
      const lastRow = XLSX.utils.sheet_add_json(worksheet, [{ email }], { skipHeader: true, origin: -1 });
  
      XLSX.writeFile(workbook, 'emails.xlsx');
  
      return res.status(200).json({ message: 'Thank you for subscribing..', error: null });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: null, error: 'Oops! Something went wrong. Please try again later.' });
    }
  });   

  // Endpoint to download the Excel file
app.get('/download-emails', (req, res) => {
    res.download('emails.xlsx', 'emails.xlsx');
});

    
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});