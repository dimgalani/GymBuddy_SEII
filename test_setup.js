'use strict';

// Import necessary libraries
var path = require('path');
var http = require('http');
var oas3Tools = require('oas3-tools');
// Default to 8080 if no PORT is specified
var serverPort = process.env.PORT || 8080;  
const got = require('got');

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

// app initialization through oas3Tools
var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Function that sets up the server to a n unused port, used by tests
async function setupTestContext(t, app) {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({
        responseType: "json",
        prefixUrl: `http://localhost:${port}`,
    });
}

// Functions to close the server after the tests have finished running
function teardownTestContext(t) {
    t.context.server.close();
}

module.exports = { app, setupTestContext, teardownTestContext };
