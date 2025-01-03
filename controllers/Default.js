'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

// Cancel a reservation for a user on a specific day and time
module.exports.cancelReservation = function cancelReservation (_, res, __, username, day, time) {
  Default.cancelReservation(username, day, time)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Check user goals based on current body weight
module.exports.checkGoalsFromInfo = function checkGoalsFromInfo (_, res, __, username, currentBodyWeight) {
  Default.checkGoalsFromInfo(username, currentBodyWeight)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      utils.writeJson(res, error.message, error.code);
    });
};

// Check goals based on progress for a specific day
module.exports.checkGoalsFromProgress = function checkGoalsFromProgress (_, res, __, username, day) {
  Default.checkGoalsFromProgress(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Create a custom exercise for a user
module.exports.createCustomExercise = function createCustomExercise (_, res, __, body, username) {
  Default.createCustomExercise(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Get available reservations for a specific day
module.exports.getAvailableReservations = function getAvailableReservations (_, res, __, username, day) {
  Default.getAvailableReservations(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Get user's planner for a specific day
module.exports.getDayofPlanner = function getDayofPlanner (_, res, __, username, day) {
  Default.getDayofPlanner(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Get the dropdown menu list for a user
module.exports.getDropDownMenuList = function getDropDownMenuList (_, res, __, username) {
  Default.getDropDownMenuList(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Get the exercise catalog for a user
module.exports.getExerciseCatalog = function getExerciseCatalog (_, res, __, username) {
  Default.getExerciseCatalog(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Get progress for a specific exercise of a user
module.exports.getExerciseProgress = function getExerciseProgress (_, res, __, username, exerciseName) {
  Default.getExerciseProgress(username, exerciseName)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Get all reservations made by the user
module.exports.getMyReservations = function getMyReservations (_, res, __, username) {
  Default.getMyReservations(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Get personal information of a user
module.exports.getPersonalInfo = function getPersonalInfo (_, res, __, username) {
  Default.getPersonalInfo(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Make a reservation for a user
module.exports.makeReservation = function makeReservation (_, res, __, body, username) {
  Default.makeReservation(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      utils.writeJson(res, error.message, error.code);
    });
};

// Update progress for a specific exercise
module.exports.updateExerciseProgress = function updateExerciseProgress (_, res, __, day, name, weight, reps, username) {
  Default.updateExerciseProgress(day, name, weight, reps, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Update personal information for a user
module.exports.updatePersonalInfo = function updatePersonalInfo (_, res, __, body, username) {
  Default.updatePersonalInfo(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};
