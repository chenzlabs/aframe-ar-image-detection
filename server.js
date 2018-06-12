// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var assets = require('./assets');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('.'));

app.use("/assets", assets);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
