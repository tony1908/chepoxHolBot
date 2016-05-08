var express = require('express');
var request = require('request')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var packageInfo = require('./package.json');

var app = express();


app.get('/', function (req, res) {
  res.json({ version: packageInfo.version });
});

app.get('/webhook/', function (req, res) {
  if (req.query['hub.verify_token'] === 'chepo_bot') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
})

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web server started at http://%s:%s', host, port);
});