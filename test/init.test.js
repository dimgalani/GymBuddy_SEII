const http = require('node:http');
const test = require('ava');
const got = require('got');

const { app, startServer } = require('../test_setup');  // Import both app and startServer

/**
 * This test file initializes a test server for AVA tests. It ensures that
 * the server is up and running before tests begin and is properly closed
 * afterward to prevent resource leaks or port conflicts.
 */

test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
	const { port } = server.address();

	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });

});

test.after((t) => {
	t.context.server.close();
	console.log('server closed');
});

test('Always pass init', (t) => {
	t.pass();
  });
