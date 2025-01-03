'use strict';
const { usernames, ExerciseCatalog } = require("./Database");
/**
 * Returns the catalog of existing exercises
 * FR8 - The user must be able to create a custom exercise / FR9 - The user must be able to see his progress at an exercise
 *
 * username String the username of the connected person
 * returns ExerciseCatalog
 * GET /user/{username}/planner/catalog
 **/
  exports.getExerciseCatalog = function(username) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
    "exercises" : [ {
      "notes" : "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-do...",
      "name" : "Lat Pull Down",
      "weightPerDateEntries" : [ 40, 40 ],
      "repetitionsPerDateEntries" : [ 8, 10]
    }, {
      "notes" : "It is a compound strength exercise. Targets several muscle groups. Setup: Stand with your feet hip-widt...",
      "name" : "Deadlift",
      "weightPerDateEntries" : [ 45, 45 ],
      "repetitionsPerDateEntries" : [ 8, 10 ]
    } ]
  };
      if(username === "invalid-user"){
        reject({
          message: 'Response code 401 (Unauthorized): Not a valid username',
          code: 401,
        });
      }
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }

/**
 * Creates a new exercise and adds it to the catalog
 * FR8 - The user must be able to create a custom exercise
 *
 * body Exercise A json object containing the Exercise
 * username String the username of the connected person
 * no response value expected for this operation
 * POST /user/{username}/planner/catalog
 **/
  exports.createCustomExercise = function(body, username) {
    return new Promise(function(resolve, reject) {
      // Check if the exercise already exists in the catalog
      const existingExercise = ExerciseCatalog.find(exercise => exercise.name === body.name);
      if (existingExercise !== undefined) {
        // If the exercise already exists in the catalog
        reject({
          message: 'Response code 409 (Conflict): Exercise already exists in the catalog',
          exercise: existingExercise,
          code: 409,
        });
      } else {
        // Add the new exercise to the catalog
        ExerciseCatalog.push(body);
        resolve({
          message: 'Exercise successfully added to the catalog',
          exercise: ExerciseCatalog[ExerciseCatalog.length - 1],
          code: 201,
        });
      }
    });
  }

/**
 * Returns name and notes for all available exercises to be displayed at the drop down menu
 * FR7 - The user must be able to track an exercise to Planner
 *
 * username String the username of the connected person
 * returns ExerciseCatalog
 **/
  exports.getDropDownMenuList = function(username) {
    return new Promise(function(resolve, reject) {
      const examples = {};
      examples['application/json'] = {
    "exercises" : [ 
      { "notes" : "note1", "name" : "exercise_1", "weightPerDateEntries" : [ 5, 6, 6, 8, 8, 5, 6, 6, 8, 8], "repetitionsPerDateEntries" : [ 10, 10, 15, 10, 10 ] },
      { "notes" : "note2", "name" : "exercise_2", "weightPerDateEntries" : [ 20, 25, 25, 25 ,30, 20, 25, 25, 25 ,30], "repetitionsPerDateEntries" : [ 15, 15, 15, 20, 15 ]  },
      { "notes" : "note3", "name" : "exercise_3", "weightPerDateEntries" : [ 30, 35, 35, 40, 45, 30, 35, 35, 40, 45], "repetitionsPerDateEntries" : [ 5, 5, 5, 5 ,8 ] }
    ]
  };
      if (!usernames.includes(username)) {
        return reject({
          message: 'Response code 401 (Unauthorized): Not a valid username',
          code: 401
        });
      }  
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
  }