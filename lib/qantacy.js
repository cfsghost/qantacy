"use strict";

var util = require('util');
var events = require('events');
var path = require('path');
var fs = require('fs');
var child_process = require('child_process');
var Brig = require('brig');
var platform = require('./platform');

// Initializing QML Controller
var brig = new Brig();
var qmlEngine = new brig.QmlEngine();
var rootContext = qmlEngine.rootContext();
var qmlContext = new brig.QmlContext(rootContext);

var Qantacy = module.exports = function() {
	var self = this;

	// Check platform
	self.platform = platform.getPlatform();
	if (!self.platform)
		throw new Error('Qantacy doesn\'t support this platform.');

	self.brig = brig;
	self.qmlEngine = qmlEngine;
	self.rootContext = rootContext;
	self.qmlContext = qmlContext;

	// Everthing is ready
	setImmediate(function() {
		self.emit('ready');
	});
};

util.inherits(Qantacy, events.EventEmitter);

Qantacy.prototype.render = function(filename) {
	var self = this;

	var component = new self.brig.QmlComponent(self.qmlEngine, filename);
	var item = component.create(self.qmlContext);

	return item;
};
