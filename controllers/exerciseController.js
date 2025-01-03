'use strict';

var utils = _uire('../utils/writer.js');
var Default = _uire('../service/DefaultService');

// Creates a custom exercise for the given username
module.exports.createCustomExercise = function createCustomExercise (_, res, __, body, username) {
  Default.createCustomExercise(body, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Retrieves the exercise catalog for the given username
module.exports.getExerciseCatalog = function getExerciseCatalog (_, res, __, username) {
  Default.getExerciseCatalog(username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Retrieves progress for a specific exercise of the given username
module.exports.getExerciseProgress = function getExerciseProgress (_, res, __, username, exerciseName) {
  Default.getExerciseProgress(username, exerciseName)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};

// Updates exercise progress for the given username, day, and exercise details
module.exports.updateExerciseProgress = function updateExerciseProgress (_, res, __, day, name, weight, reps, username) {
  Default.updateExerciseProgress(day, name, weight, reps, username)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};
