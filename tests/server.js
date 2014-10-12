
var test = require('tape');
var Server = require('../').Server;

test('server', function(t) {
	t.plan(3); 

	var server = new Server();
	t.pass('Initialized server object');

	server.on('ready', function() {
		t.pass('ready event');
	});

	server.listen(41011, function() {
		t.pass('listen callback');
		t.end();
	});
});
