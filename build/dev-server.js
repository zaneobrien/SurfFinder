var express = require('express');
var app = express();

var opn = require('opn')

console.log('> Starting dev server...')
app.get('/', function (req, res) {
    res.sendfile('Surf.html');
});

var port = 5000;
var uri = 'http://localhost:' + port;

// Listen to port 5000
app.listen(5000, function () {
    console.log('Dev app listening on port ' + port);
});

opn(uri)
