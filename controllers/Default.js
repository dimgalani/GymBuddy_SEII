'use strict';

// Import functions from other services
var { cancelReservation, makeReservation, getAvailableReservations, getMyReservations } = require('./reservationController');
var { checkGoalsFromInfo, checkGoalsFromProgress } = require('./goalController');
var { createCustomExercise, getExerciseCatalog, getExerciseProgress, updateExerciseProgress } = require('./exerciseController');
var { getPersonalInfo, updatePersonalInfo, getDropDownMenuList} = require('./personalInfoController');

// Rename and export the functions as if they belong to this module
module.exports = {
  cancelReservation,
  makeReservation,
  getAvailableReservations,
  getMyReservations,
  checkGoalsFromInfo,
  checkGoalsFromProgress,
  createCustomExercise,
  getExerciseCatalog,
  getExerciseProgress,
  updateExerciseProgress,
  getPersonalInfo,
  updatePersonalInfo,
  getDropDownMenuList
};
