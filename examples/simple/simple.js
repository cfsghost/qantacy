var Qantacy = require('../../');

var qantacy = new Qantacy();

qantacy.on('ready', function() {
	qantacy.render('simple.qml');
});

qantacy.init();
