var express = require('express');
var request = require('request')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var packageInfo = require('./package.json');

var app = express();
var token = "EAAOCWDJppPcBAPECyKIvDxQ4JtWH9ZC7EicbJZAXoZBa3jIJV3F4uO4jT38IoBz3GrZB8x5paSw2dzdp0tS2juF75XZC2J3jpYv8LOoJZB0BayQgoWnVeZBPwSsWqAdwCg4mSYotoI84qpnYeKPMX4TLolylJynigDZCBKSQbxO8swZDZD"


app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

// app.get('/webhook/', function (req, res) {
//   if (req.query['hub.verify_token'] === 'chepo_bot') {
//     res.send(req.query['hub.challenge']);
//   }
//   res.send('Error, wrong validation token');
// })

app.post('/webhook/', jsonParser,  function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    console.log(event)
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      	console.log(event.message.text)
        sendTextMessage(sender, "Welcome to this new bot");
        continue;
      }
      // Handle a text message from this sender
    }
  }
  res.sendStatus(200);
});


var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});