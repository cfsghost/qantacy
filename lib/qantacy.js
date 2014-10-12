"use strict";

var util = require('util');
var events = require('events');
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');

var platform = require('./platform');
var Server = require('./server');
var Client = require('./client');

var Qantacy = module.exports = function() {
	var self = this;

	self.platform = platform.getPlatform();
	if (!self.platform)
		throw new Error('Qantacy doesn\'t support this platform.');

	self.windowNum = 0;
	self.server = new Server();
};

util.inherits(Qantacy, events.EventEmitter);

Qantacy.prototype.init = function() {
	var self = this;

	self.server.listen(41011, function() {
		console.log('Qantacy server is running on ' + self.port + ' port');
	});
};

Qantacy.prototype.render = function(filename) {
	var self = this;

	self.windowNum++;
	if (self.windowNum == 1) {
		// Running the first QML viewer
		var viewer = child_process.spawn('qml', [
			'-i', path.join(__dirname, '..', 'imports'),
//			'-I', path.join(__dirname, '..', 'platform', self.platform, 'qt5'),
			filename
		]);

		viewer.stdout.on('data', function(data) {
			console.log(data.toString());
		});

		viewer.on('close', function() {

			self.windowNum--;
		});
	}
};



Qantacy.Server = Server;
Qantacy.Client = Client;
