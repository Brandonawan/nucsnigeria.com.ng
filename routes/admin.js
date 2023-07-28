const express = require('express');
const router = express.Router();
const XLSX = require('xlsx');
const { validationResult } = require('express-validator');
const Email = require('../models/emailSchema');

// Add this route to get the total count of newsletter subscriptions
router.get('/newsletter/count', async (req, res) => {
  try {
    const totalSubscriptions = await Email.countDocuments();
    res.json({ totalSubscriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Oops! Something went wrong. Please try again later.' });
  }
});

// Add more admin routes for dashboard and other functionalities if needed
router.get('/admin-dashboard', (req, res) => {
  res.render('admin/dashboard'); // Render the "dashboard.ejs" file inside the "admin" folder
});

// Example of more admin routes (you can add more routes as per your requirements)
router.get('/admin-create-post', (req, res) => {
  res.render('admin/create-post'); // Render the "users.ejs" file inside the "admin" folder
});

module.exports = router;
