"use strict";

var child_process = require('child_process');

var Qantacy = module.exports = function() {
	var self = this;

	self.windowNum = 0;
};

Qantacy.prototype.render = function(filename) {
	var self = this;

	self.windowNum++;

	if (self.windowNum == 1) {

		// Running the first QML viewer
		var viewer = child_process.spawn('qml', [ filename ]);
		viewer.on('close', function() {

			self.windowNum--;
		});
	}
};
