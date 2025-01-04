'use strict';

/**
 * Default.js
 * 
 * This module defines the route handlers for various API endpoints. Each handler
 * interacts with the corresponding service layer (DefaultService) and sends
 * responses to clients using a utility writer module.
 */

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

/**
 * Cancels a reservation for a specific user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware next function.
 * @param {string} username - The username of the individual.
 * @param {string} day - The day of the reservation.
 * @param {string} time - The time of the reservation.
 */
module.exports.cancelReservation = function cancelReservation(req, res, next, username, day, time) {
  Default.cancelReservation(username, day, time)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

/**
 * Checks goals from personal information for a specific user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware next function.
 * @param {string} username - The username of the individual.
 * @param {number} currentBodyWeight - The current body weight of the individual.
 */
module.exports.checkGoalsFromInfo = function checkGoalsFromInfo(req, res, next, username, currentBodyWeight) {
  Default.checkGoalsFromInfo(username, currentBodyWeight)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      utils.writeJson(res, error.message, error.code);
    });
};

/**
 * Checks goals based on progress data for a specific user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware next function.
 * @param {string} username - The username of the individual.
 * @param {string} day - The day for which progress data is checked.
 */
module.exports.checkGoalsFromProgress = function checkGoalsFromProgress(req, res, next, username, day) {
  Default.checkGoalsFromProgress(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

/**
 * Creates a custom exercise for a specific user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware next function.
 * @param {Object} body - The details of the custom exercise.
 * @param {string} username - The username of the individual.
 */
module.exports.createCustomExercise = function createCustomExercise(req, res, next, body, username) {
  Default.createCustomExercise(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

/**
 * Retrieves available reservations for a specific user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware next function.
 * @param {string} username - The username of the individual.
 * @param {string} day - The day for which reservations are requested.
 */
module.exports.getAvailableReservations = function getAvailableReservations(req, res, next, username, day) {
  Default.getAvailableReservations(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

/**
 * Retrieves the planner data for a specific day.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware next function.
 * @param {string} username - The username of the individual.
 * @param {string} day - The day for which planner data is requested.
 */
module.exports.getDayofPlanner = function getDayofPlanner(req, res, next, username, day) {
  Default.getDayofPlanner(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

/**
 * Retrieves the drop-down menu list for a specific user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware next function.
 * @param {string} username - The username of the individual.
 */
module.exports.getDropDownMenuList = function getDropDownMenuList(req, res, next, username) {
  Default.getDropDownMenuList(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

/**
 * Retrieves the exercise catalog for a specific user.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware next function.
 * @param {string} username - The username of the individual.
 */
module.exports.getExerciseCatalog = function getExerciseCatalog(req, res, next, username) {
  Default.getExerciseCatalog(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Continue adding similar documentation for the rest of the functions...


// Function to get exercise progress for a specific exercise
module.exports.getExerciseProgress = function getExerciseProgress (req, res, next, username, exerciseName) {
  Default.getExerciseProgress(username, exerciseName)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get the user's reservations
module.exports.getMyReservations = function getMyReservations (req, res, next, username) {
  Default.getMyReservations(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get personal information for a user
module.exports.getPersonalInfo = function getPersonalInfo (req, res, next, username) {
  Default.getPersonalInfo(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to make a reservation for the user
module.exports.makeReservation = function makeReservation (req, res, next, body, username) {
  Default.makeReservation(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      utils.writeJson(res, error.message, error.code);
    });
};

// Function to update exercise progress for a specific day and exercise
module.exports.updateExerciseProgress = function updateExerciseProgress (req, res, next, day, name, weight, reps, username) {
  Default.updateExerciseProgress(day, name, weight, reps, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to update personal information for the user
module.exports.updatePersonalInfo = function updatePersonalInfo (req, res, next, body, username) {
  Default.updatePersonalInfo(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};
