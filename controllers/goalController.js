'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

// Checks the goals based on current body weight for the given username
module.exports.checkGoalsFromInfo = function checkGoalsFromInfo (req, res, next, username, currentBodyWeight) {
  Default.checkGoalsFromInfo(username, currentBodyWeight)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (error) {
      utils.writeJson(res, error.message, error.code);
    });
};

// Checks the progress of the goals for the given username on a specific day
module.exports.checkGoalsFromProgress = function checkGoalsFromProgress (req, res, next, username, day) {
  Default.checkGoalsFromProgress(username, day)
    .then(function (response) {
      utils.writeJson(res, response, response.code);
    })
    .catch(function (response) {
      utils.writeJson(res, response, response.code);
    });
};
