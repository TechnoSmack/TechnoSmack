const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Configure your transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'admin@h2ointernational.org',
      pass: 'Montreal123!' // Use environment variables for sensitive data
    }
  });
  const mailOptions = {
    from: email,
    to: 'support@technosmack.com',
    subject: `Contact Form: ${name}`,
    text: message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send('Error');
    res.send('Message sent!');
  });
});

app.listen(3000, () => console.log('Server started'));