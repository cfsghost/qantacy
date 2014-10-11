"use strict";

var getPlatform = function() {

	var platforms = {
		'x64_linux': 'x86_64-linux-gnu',
		'x86_linux': 'i386-linux-gnu'
	}

	return platforms[process.arch + '_' + 'linux'] || null;
};

module.exports = {
	getPlatform: getPlatform
};
