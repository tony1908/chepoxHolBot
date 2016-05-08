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

request('https://chepoxholserver.herokuapp.com/facesent?sent=positive', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
  }
})

function sendTextMessage(sender, text) {
  messageData = {
    text:text
  }
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:token},
    method: 'POST',
    json: {
      recipient: {id:sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

app.post('/webhook/', jsonParser,  function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    console.log(event)
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
      var urlReq = 'https://chepoxholserver.herokuapp.com/api?texto='+text
      	console.log(event.message.text)
      	request(urlReq, function (error, response, body) {
      		sendTextMessage(sender, body);
		    console.log(body)   
		})
        
        continue;
      }
      // Handle a text message from this sender
  }
  res.sendStatus(200);
});


var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});