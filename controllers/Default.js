'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');
var Catalog = require('../service/CatalogService');
var Goals = require('../service/GoalsService');
var Planner = require('../service/PlannerService');
var Reservations = require('../service/ReservationsService');

// Function to cancel a reservation
module.exports.cancelReservation = function cancelReservation ( /* unused */, res, next, username, day, time) {
  Reservations.cancelReservation(username, day, time)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to check goals based on user information
module.exports.checkGoalsFromInfo = function checkGoalsFromInfo (/* unused */, res, next, username, currentBodyWeight) {
  Goals.checkGoalsFromInfo(username, currentBodyWeight)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      // console.log(error);
      utils.writeJson(res, error.message, error.code);
    });
};

// Function to check goals based on user progress
module.exports.checkGoalsFromProgress = function checkGoalsFromProgress (/* unused */, res, next, username, day) {
  Goals.checkGoalsFromProgress(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to create a custom exercise for the user
module.exports.createCustomExercise = function createCustomExercise (/* unused */, res, next, body, username) {
  Catalog.createCustomExercise(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get available reservations for a specific day
module.exports.getAvailableReservations = function getAvailableReservations (/* unused */, res, next, username, day) {
  Reservations.getAvailableReservations(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get the user's planner for a specific day
module.exports.getDayofPlanner = function getDayofPlanner (/* unused */, res, next, username, day) {
  Planner.getDayofPlanner(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get the dropdown menu list for a user
module.exports.getDropDownMenuList = function getDropDownMenuList (/* unused */, res, next, username) {
  Catalog.getDropDownMenuList(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get the exercise catalog for a user
module.exports.getExerciseCatalog = function getExerciseCatalog (/* unused */, res, next, username) {
  Catalog.getExerciseCatalog(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get exercise progress for a specific exercise
module.exports.getExerciseProgress = function getExerciseProgress (/* unused */, res, next, username, exerciseName) {
  Planner.getExerciseProgress(username, exerciseName)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get the user's reservations
module.exports.getMyReservations = function getMyReservations (/* unused */, res, next, username) {
  Reservations.getMyReservations(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to get personal information for a user
module.exports.getPersonalInfo = function getPersonalInfo (/* unused */, res, next, username) {
  Default.getPersonalInfo(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to make a reservation for the user
module.exports.makeReservation = function makeReservation (/* unused */, res, next, body, username) {
  
  Reservations.makeReservation(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      utils.writeJson(res, error.message, error.code);
    });
};

// Function to update exercise progress for a specific day and exercise
module.exports.updateExerciseProgress = function updateExerciseProgress (/* unused */, res, next, day, name, weight, reps, username) {
  Planner.updateExerciseProgress(day, name, weight, reps, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Function to update personal information for the user
module.exports.updatePersonalInfo = function updatePersonalInfo (/* unused */, res, next, body, username) {
  Default.updatePersonalInfo(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};
