"use strict";

var util = require('util');
var events = require('events');
var http = require('http');

var Client = module.exports = function() {
	var self = this;

	self.server = '127.0.0.1';
	self.port = 41011;
};

util.inherits(Client, events.EventEmitter);

Client.prototype.connect = function() {
	var self = this;

	if (arguments.length == 1) {
		self.server = arguments[0];
	} else if (arguments.length == 2) {
		self.server = arguments[0];
		self.port = arguments[1];
	}

	// Check whether server exists already
	var req = http.request({
		hostname: self.server,
		port: self.port,
		path: '/',
		method: 'GET'
	}, function(res) {

		// It's not Qantacy server
		if (res.statusCode != 200) {
			self.emit('unrecognize');
			return;
		}

		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			try {
				var info = JSON.parse(chunk);
			} catch(e) {
				// Failed to parse, it seem not a vaild server. We don't think it is Qantacy server.
				self.emit('unrecognize');
				return;
			}

			// That's it.
			if (info.protocol == 'Qantacy' && info.version == '1.0') {
				self.emit('ready');
				return;
			}

			self.emit('unrecognize');
		});
	});

	req.on('error', function(err) {
		self.emit('error');
	});

	req.end();
};
