import express       = require('express');
import http          = require('http');
import path          = require('path');
import offlineSearch = require('cs-offline-search');

var cc = require("./ClientConnection");
var fr = require("./layers/FlightRadar");
/**
 * Create a search index file which can be loaded statically.
 */
var offlineSearchManager = new offlineSearch('public/data/projects/projects.json', {
    propertyNames: ['Name', 'plaatnaam', 'postcode', 'Postcode', 'straat', 'loc_straat', 'KvK', 'gemeente', 'plaats', 'Naam_van_het_concern_DigiMV_2012'],
    stopWords: ['de', 'het', 'een', 'en', 'van', 'aan']
});

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
