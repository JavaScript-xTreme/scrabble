'use strict';

var port = process.env.PORT || 4000;

var express    = require('express');
var less       = require('express-less');
var initRoutes = require('./lib/init-routes');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/* --- pipeline begins */
app.use(initRoutes);
app.use(express.logger(':remote-addr -> :method :url [:status]'));
app.use(express.favicon());
app.use(express.static(__dirname + '/static'));
app.use('/less', less(__dirname + '/less'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
/* --- pipeline ends   */

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port);
});

var sockets = require('./lib/sockets');
var io = require('socket.io').listen(server, {log:true, 'log level':2});
io.of('/game').on('connection', sockets.connection);

module.exports = app;
