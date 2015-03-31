var express = require('express');
var http = require('http');
var path = require('path');
var offlineSearch = require('cs-offline-search');
/**
 * Create a search index file which can be loaded statically.
 */
var offlineSearchManager = new offlineSearch('public/data/projects/projects.json', {
    propertyNames: ['Name', 'plaatnaam', 'postcode', 'Postcode', 'straat', 'loc_straat', 'KvK', 'gemeente', 'plaats', 'Naam_van_het_concern_DigiMV_2012'],
    stopWords: ['de', 'het', 'een', 'en', 'van', 'aan']
});
var server = express();
//   all environments
server.set('port', '3003');
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
http.createServer(server).listen(server.get('port'), function () {
    console.log('Express server listening on port ' + server.get('port'));
});
//# sourceMappingURL=server.js.map