import express = require('express');
import http    = require('http');
import path = require('path');
var cc = require("./ClientConnection");
var fr = require("./layers/FlightRadar");

// setup socket.io object
var server = express();
var httpServer = require('http').Server(server);
var io = require('socket.io')(httpServer);

io.on('connection', function (socket) {
    console.log('a user has connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });


});

// all environments
server.set('port', '3002');
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
//server.set('view engine', 'html');
//server.engine('html', require('jade').renderFile);
server.use(express.favicon());
server.use(express.logger('dev'));
server.use(express.json());
server.use(express.urlencoded());
server.use(express.methodOverride());
server.use(server.router);

var cm = new cc.ConnectionManager(httpServer);
var planes = new fr.FlightRadar(cm, "FlightRadar");
planes.Start();

server.get("/fr", planes.GetLayer);

server.use(express.static(path.join(__dirname, 'public')));
console.log("started");

// development only
if ('development' == server.get('env')) {
    server.use(express.errorHandler());
}

//server.get('/', (req, res) => {
//    res.render('index.html');
//});
//server.get('/', routes.index);
//server.get('/users', user.list);

httpServer.listen(server.get('port'),() => {
    console.log('Express server listening on port ' + server.get('port'));
});
