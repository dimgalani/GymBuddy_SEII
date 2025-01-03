'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

// Cancels a reservation for the given username, day, and time
module.exports.cancelReservation = function cancelReservation (req, res, next, username, day, time) {
  Default.cancelReservation(username, day, time)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Retrieves available reservations for a given username and day
module.exports.getAvailableReservations = function getAvailableReservations (req, res, next, username, day) {
  Default.getAvailableReservations(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Retrieves all reservations made by the given username
module.exports.getMyReservations = function getMyReservations (req, res, next, username) {
  Default.getMyReservations(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Makes a new reservation for the given username
module.exports.makeReservation = function makeReservation (req, res, next, body, username) {
  Default.makeReservation(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      utils.writeJson(res, error.message, error.code);
    });
};

// Retrieves the planner for a specific day and username
module.exports.getDayofPlanner = function getDayofPlanner (req, res, next, username, day) {
  Default.getDayofPlanner(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};
