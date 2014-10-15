var Qantacy = require('../../');

var qantacy = new Qantacy();

qantacy.on('ready', function() {
	console.log('ready');

	// Rendering specific QML file
	var window = qantacy.render('simple.qml');
});
