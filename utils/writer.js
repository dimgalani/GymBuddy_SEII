/**
 * writer.js
 * 
 * This module provides utilities to construct and send JSON responses in an HTTP server context.
 * It includes a helper class `ResponsePayload` for encapsulating response codes and payloads, 
 * and functions for creating and sending JSON responses.
 */

/**
 * Represents a response payload with a status code and data.
 * @constructor
 * @param {number} code - The HTTP status code for the response.
 * @param {any} payload - The data to be included in the response.
 */
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

/**
 * Constructs a ResponsePayload instance with the given status code and payload.
 * @param {number} code - The HTTP status code for the response.
 * @param {any} payload - The data to be included in the response.
 * @returns {ResponsePayload} The constructed ResponsePayload object.
 */
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

/**
 * Sends a JSON response to the client.
 * This function determines the HTTP status code and payload based on its arguments and writes
 * the response to the provided HTTP response object.
 * 
 * @param {object} response - The HTTP response object.
 * @param {any} arg1 - The response payload or status code, or a ResponsePayload instance.
 * @param {number} [arg2] - The HTTP status code, if not provided in `arg1`.
 */
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;
  var payload;

  // Handle ResponsePayload objects
  if (arg1 && arg1 instanceof ResponsePayload) {
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the status code
  if (arg2 && Number.isInteger(arg2)) {
    code = arg2;
  } else if (arg1 && Number.isInteger(arg1)) {
    code = arg1;
  }

  // Determine the payload
  if (code && arg1) {
    payload = arg1;
  } else if (arg1) {
    payload = arg1;
  }

  // Default to status code 200 if none provided
  if (!code) {
    code = 200;
  }

  // Convert payload to JSON string if it is an object
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  // Write the response
  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
}

