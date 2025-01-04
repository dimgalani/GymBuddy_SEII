'use strict';

var path = require('path');
var http = require('http');
var oas3Tools = require('oas3-tools');
var serverPort = process.env.PORT || 8080;  // Default to 8080 if no PORT is specified

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

// Create a function to start the server
function startServer(port = serverPort) {
    http.createServer(app).listen(port, function () {
        console.log('Your server is listening on port %d (http://localhost:%d)', port, port);
        console.log('Swagger-ui is available on http://localhost:%d/docs', port);
    });
}

module.exports = { app, startServer };
