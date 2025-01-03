'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');
var Catalog = require('../service/CatalogService');
var Goals = require('../service/GoalsService');
var Planner = require('../service/PlannerService');
var Reservations = require('../service/ReservationsService');

module.exports.cancelReservation = function cancelReservation (req, res, next, username, day, time) {
  Reservations.cancelReservation(username, day, time)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.checkGoalsFromInfo = function checkGoalsFromInfo (req, res, next, username, currentBodyWeight) {
  Goals.checkGoalsFromInfo(username, currentBodyWeight)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      // console.log(error);
      utils.writeJson(res, error.message, error.code);
    });
};

module.exports.checkGoalsFromProgress = function checkGoalsFromProgress (req, res, next, username, day) {
  Goals.checkGoalsFromProgress(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.createCustomExercise = function createCustomExercise (req, res, next, body, username) {
  Catalog.createCustomExercise(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.getAvailableReservations = function getAvailableReservations (req, res, next, username, day) {
  Reservations.getAvailableReservations(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.getDayofPlanner = function getDayofPlanner (req, res, next, username, day) {
  Planner.getDayofPlanner(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.getDropDownMenuList = function getDropDownMenuList (req, res, next, username) {
  Catalog.getDropDownMenuList(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.getExerciseCatalog = function getExerciseCatalog (req, res, next, username) {
  Catalog.getExerciseCatalog(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.getExerciseProgress = function getExerciseProgress (req, res, next, username, exerciseName) {
  Planner.getExerciseProgress(username, exerciseName)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.getMyReservations = function getMyReservations (req, res, next, username) {
  Reservations.getMyReservations(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.getPersonalInfo = function getPersonalInfo (req, res, next, username) {
  Default.getPersonalInfo(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.makeReservation = function makeReservation (req, res, next, body, username) {
  
  Reservations.makeReservation(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      utils.writeJson(res, error.message, error.code);
    });
};

module.exports.updateExerciseProgress = function updateExerciseProgress (req, res, next, day, name, weight, reps, username) {
  Planner.updateExerciseProgress(day, name, weight, reps, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

module.exports.updatePersonalInfo = function updatePersonalInfo (req, res, next, body, username) {
  Default.updatePersonalInfo(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};
