"use strict";

var util = require('util');
var events = require('events');
var http = require('http');
var WebSocket = require('websocket');

var Server = module.exports = function() {
	var self = this;

	self.port = 41011;
	self.server = http.createServer(function(req, res) {
		res.writeHead(200);
		res.end(JSON.stringify({
			protocol: 'Qantacy',
			version: '1.0'
		}));
	});

	self.wsServer = new WebSocket.server({
		httpServer: self.server,
		autoAcceptConnections: false
	});

	self.wsServer.on('request', function(req) {
		// TODO: Allow only local client
		var connection = req.accept();

		connection.on('message', function(message) {
			console.log('Received Message: ' + message.utf8Data);
			connection.sendUTF(message.utf8Data);
		});
	});
};

util.inherits(Server, events.EventEmitter);

Server.prototype.listen = function(port, callback) {
	var self = this;

	if (callback) {
		self.once('ready', function() {
			callback();
		});
	}

	self.server.listen(port, function() {
		console.log('Qantacy server is running on ' + self.port + ' port');
		self.emit('ready');
	});
};
