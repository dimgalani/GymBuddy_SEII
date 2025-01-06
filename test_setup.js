'use strict';

var path = require('path');
var http = require('http');
var oas3Tools = require('oas3-tools');
var serverPort = process.env.PORT || 8080;  // Default to 8080 if no PORT is specified
const got = require('got');

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

async function setupTestContext(t, app) {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
    t.context.got = got.extend({
        responseType: "json",
        prefixUrl: `http://localhost:${port}`,
    });
}

function teardownTestContext(t) {
    t.context.server.close();
}

module.exports = { app, setupTestContext, teardownTestContext };
