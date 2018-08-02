const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  var count= req.body.countText ;
  var maillist=[];
  for(var i=1;i<=count;i++){
    maillist.push(req.body['mytext'+i]);
  }
  maillist.toString();

//var mailid=req.body['mytext'+1];
  // const output = `
  //   <a href="https://www.google.com" />
  // `;
  console.log(maillist);

  maillist.forEach(function (to, i , array) {
    var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
          user: 'slackmailing@gmail.com',
          pass: 'Slack@246'
      }
    }));
    const output = `
      <a href="https://www.asdf.com?q='+to+'">Join</a>
    `;
    var msg = {
      from: 'slackmailing@gmail.com', // sender address
       to: maillist, // list of receivers
       subject: 'Node Contact Request', // Subject line
       text: 'Hello world?', // plain text body
       html: output // html body
      }
    msg.to = to;

    transporter.sendMail(msg, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
  });

  res.render('contact', {msg:'Email has been sent'});


// const mailOptions = {
//   from: 'slackmailing@gmail.com', // sender address
//   to: maillist, // list of receivers
//   subject: 'Node Contact Request', // Subject line
//   text: 'Hello world?', // plain text body
//   html: output // html body
// };

  // send mail with defined transport object
  // transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //         return console.log(error);
  //     }
  //     console.log('Message sent: %s', info.messageId);
  //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  //
  //     res.render('contact', {msg:'Email has been sent'});
  // });
  });

app.listen(8080, () => console.log('Server started...'));
