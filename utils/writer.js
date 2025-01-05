var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

var writeJson = exports.writeJson = function(response, arg1, arg2) {
  let code = 200; // default to 200
  let payload;

  // Handle ResponsePayload directly
  if (arg1 instanceof ResponsePayload) {
    return writeJson(response, arg1.payload, arg1.code);
  }

  // Set code and payload based on provided arguments
  if (Number.isInteger(arg2)) {
    code = arg2;
    payload = arg1;
  } else if (Number.isInteger(arg1)) {
    code = arg1;
  } else {
    payload = arg1;
  }

  // Convert payload to JSON string if it's an object
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2);
  }

  response.writeHead(code, {'Content-Type': 'application/json'});
  response.end(payload);
}