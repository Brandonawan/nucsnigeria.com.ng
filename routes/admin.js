const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const XLSX = require('xlsx');
const { validationResult } = require('express-validator');

const app = express();
const ejs = require("ejs");

const router = express.Router();

// connect to emailSchema.js
const Email = require('../models/emailSchema');

app.get('/admin/dashboard', (req, res) => {
    res.render('admin');
  });
  
  app.get('/tables', (req, res) => {
    res.render('tables');
  });


module.exports = router;
