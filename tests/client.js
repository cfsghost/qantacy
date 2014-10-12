
var test = require('tape');
var Client = require('../').Client;
var Server = require('../').Server;

var startTest = function() {
	test('client', function(t) {
		t.plan(3); 

		var client = new Client();
		t.pass('Initialized client object');

		client.on('ready', function() {
			t.pass('ready event');
		});

		client.on('error', function() {
			t.fail('cannot connect to server');
		});

		client.on('unrecognize', function() {
			t.fail('uncognized server');
		});

		client.connect('127.0.0.1', 41011);
		t.pass('connect to server');
	});
};

var server = new Server();
server.on('ready', startTest);
server.listen(41011);
