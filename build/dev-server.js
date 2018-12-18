var express = require('express');
var app = express();

var opn = require('opn');

console.log('> Starting dev server...');

app.use(express.static(__dirname + '/../'));

app.get('/', function (req, res) {
    res.sendfile('Surf.html');
});

var port = 8081;
var uri = 'http://localhost:' + port;

 //Listen to port 8081
app.listen(8081, function () {
    console.log('Dev app listening on port ' + port);
});

opn(uri).catch(() => {});
