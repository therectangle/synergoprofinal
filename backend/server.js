const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
// app.use(bodyParser.json({limit: "50mb"}));
// app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.post('/sendFormData', (req, res) => {
  console.log(req.body, 'data of form');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '587',
    auth: {
      user: 'meecreationsdevelopers@gmail.com', // must be Gmail
      pass: 'Mee@Developers2019'
    }
  });

  var mailOptions = {
    from: 'meecreationsdevelopers@gmail.com',
    to: `${req.body.name} <${req.body.email}>`, // must be Gmail
    
    subject: 'Self Assestment Sheet',
    html: `
            
			<p>Dear ${req.body.name} Please Find The Below Link To Download your Self Assestment Sheet<br/> <a href="${req.body.pdfLink}">Click Here</a></p>
          `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'successfuly sent!'
      })
    }
  });

});

app.listen(5000, () => {
  console.log("server run For email1!!!");
});