const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Define the email content
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.RECIPIENT_EMAIL,
  subject: 'Scheduled Email Notification',
  text: 'This is a scheduled email notification.'
};

// Define middleware to send email notifications
const sendEmailNotification = (req, res, next) => {
  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      // Handle the error as per your application's requirements
      next(error); // Pass the error to the next middleware or error handler
    } else {
      console.log('Email sent:', info.response);
      next(); // Move to the next middleware or route handler
    }
  });
};

// Define cron schedule to execute the middleware every day at 9 AM
cron.schedule('0 9 * * *', () => {
  // Execute the middleware at the scheduled time
  sendEmailNotification(null, null, () => {
    console.log('Scheduled task executed.'); // Optional logging
  });
}, {
  timezone: 'Asia/Kolkata'
});

// Add the middleware to the route(s) where you want to send email notifications
app.get('/user/profile', sendEmailNotification, (req, res) => {
  // Route handler logic
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
