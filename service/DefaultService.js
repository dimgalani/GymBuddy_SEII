'use strict';


/**
 * Cancels a reservation by deleting it
 * FR4 - The user must be able to cancel a reservation
 *
 * username String the username of the connected person
 * day Long the day of the reservation
 * no response value expected for this operation
 **/
exports.cancelReservation = function(username,day) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns true/false depending bodyweight goal progress
 * FR10 - The system must be able to notify the user when their goals have been achieved
 *
 * username String the username of the connected person
 * currentBodyWeight Float 
 * returns Boolean
 **/
exports.checkGoalsFromInfo = function(username,currentBodyWeight) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = true;
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Checks if the user has reached their goals based on progress of the selected exercise
 * FR10 - The system must be able to notify the user when his goals have been achieved
 *
 * username String the username of the connected person
 * day Integer the selected day of the planner
 * returns List
 **/
exports.checkGoalsFromProgress = function(username,day) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ true, true ];
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
 **/
exports.createCustomExercise = function(body,username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns all the reservations' details for a specific day (time, available seats)
 * FR2 - The user must be able to see the availability of a certain date and time
 *
 * username String the username of the connected person
 * day String the day selected for a reservation
 * returns List
 **/
exports.getAvailableReservations = function(username,day) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "date",
  "reservationsPerMuscleGroup" : [ 6, 6 ],
  "muscleGroup" : "muscleGroup",
  "time" : "time",
  "availability" : 0
}, {
  "date" : "date",
  "reservationsPerMuscleGroup" : [ 6, 6 ],
  "muscleGroup" : "muscleGroup",
  "time" : "time",
  "availability" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns a list of the existing exercise progress entries for a selected day
 * FR7 - The user must be able to track an exercise to Planner
 *
 * username String the username of the connected person
 * day String the selected day of the planner
 * returns DayofPlanner
 **/
/*exports.getDayofPlanner = function(username,day) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "currentDate" : 0,
  "exercisesList" : [ {
    "notes" : "notes",
    "name" : "name",
    "weightPerDateEntries" : [ 6.0274563, 6.0274563 ],
    "repetitionsPerDateEntries" : [ 1, 1 ]
  }, {
    "notes" : "notes",
    "name" : "name",
    "weightPerDateEntries" : [ 6.0274563, 6.0274563 ],
    "repetitionsPerDateEntries" : [ 1, 1 ]
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
} */

exports.getDayofPlanner = function (day, username) {
  return new Promise(function (resolve, reject) {
    const dayofPlannerData = {
      john_doe: {
        1: {
          currentDate: 1,
          exercisesList: [
            {
              name: "Romanian Deadlift",
              notes: "Focus on form",
              weightPerDateEntries: [60, 65],
              repetitionsPerDateEntries: [8, 12],
            },
            {
              name: "Hip Thrust",
              notes: "Keep back straight",
              weightPerDateEntries: [80, 85],
              repetitionsPerDateEntries: [10, 15],
            },
          ],
        },
      },
      jane_smith: {
        2: {
          currentDate: 2,
          exercisesList: [
            {
              name: "Bulgarian Split Squat",
              notes: "Increase weight next time",
              weightPerDateEntries: [40, 45],
              repetitionsPerDateEntries: [12, 12],
            },
            {
              name: "Smith Machine Squats",
              notes: "Slow descent",
              weightPerDateEntries: [100, 110],
              repetitionsPerDateEntries: [8, 8],
            },
          ],
        },
      },
      default: {
        1: {
          currentDate: 1,
          exercisesList: [], // Empty exercisesList for the default user
        },
      },
    };

    if (!Number.isInteger(day) || typeof username !== 'string') {
      // If the data types are incorrect
      reject({
        message: 'Response code 400 (Bad Request): Wrong data types for username or day.',
        code: 400,
      });
    } else if (dayofPlannerData[username] && dayofPlannerData[username][day]) {
      // If user and day data exist
      resolve(dayofPlannerData[username][day]);
    } else {
      // If no progress data is found for the specified username and day
      reject({
        message: 'Response code 404 (Not Found): No progress data found for the specified username and day.',
        code: 404,
      });
    }
  });
};


/**
 * Returns name and notes for all available exercises to be displayed at the drop down menu
 * FR7 - The user must be able to track an exercise to Planner
 *
 * username String the username of the connected person
 * returns ExerciseCatalog
 **/
exports.getDropDownMenuList = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "exercises" : [ {
    "notes" : "notes",
    "name" : "name",
    "weightPerDateEntries" : [ 6.0274563, 6.0274563 ],
    "repetitionsPerDateEntries" : [ 1, 1 ]
  }, {
    "notes" : "notes",
    "name" : "name",
    "weightPerDateEntries" : [ 6.0274563, 6.0274563 ],
    "repetitionsPerDateEntries" : [ 1, 1 ]
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the catalog of existing exercises
 * FR8 - The user must be able to create a custom exercise / FR9 - The user must be able to see his progress at an exercise
 *
 * username String the username of the connected person
 * returns ExerciseCatalog
 **/
exports.getExerciseCatalog = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "exercises" : [ {
    "notes" : "notes",
    "name" : "name",
    "weightPerDateEntries" : [ 6.0274563, 6.0274563 ],
    "repetitionsPerDateEntries" : [ 1, 1 ]
  }, {
    "notes" : "notes",
    "name" : "name",
    "weightPerDateEntries" : [ 6.0274563, 6.0274563 ],
    "repetitionsPerDateEntries" : [ 1, 1 ]
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the arrays of progress (weights, reps) for the chosen exercise so that the diagrams will be generated
 * FR9 - The user must be able to see his progress at an exercise
 *
 * username String the username of the connected person
 * exerciseName Exercise the chosen exercise
 * returns Exercise
 **/
/* exports.getExerciseProgress = function(username,exerciseName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "notes" : "notes",
  "name" : "name",
  "weightPerDateEntries" : [ 6.0274563, 6.0274563 ],
  "repetitionsPerDateEntries" : [ 1, 1 ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
} */

  exports.getExerciseProgress = function (username, exerciseName) {
    return new Promise(function (resolve, reject) {
      const exerciseData = {
        john_doe: {
          "Lat_Pull_Down": {
            name: "Lat Pull Down",
            notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-down machine with your knees securely under the pads. Adjust the thigh pads to fit comfortably against your thighs. Grasp the wide bar with an overhand grip, hands slightly wider than shoulder-width apart.",
            weightPerDateEntries: [40.0, 42.5, 45.0],
            repetitionsPerDateEntries: [10, 12, 14],
          },
          "Hip Thrust": {
            name: "Hip Thrust",
            notes: "Engage glutes throughout the lift. Focus on keeping your upper back against the bench and avoid arching your lower back.",
            weightPerDateEntries: [80, 85, 90],
            repetitionsPerDateEntries: [10, 12, 10],
          },
        },
        alice_wonders: {
          "Bulgarian Split Squat": {
            name: "Bulgarian Split Squat",
            notes: "Targets quads, glutes, and hamstrings. Place your rear foot on an elevated surface and keep your front knee tracking over your toes.",
            weightPerDateEntries: [45, 50, 55],
            repetitionsPerDateEntries: [10, 12, 10],
          },
          "Deadlift": {
            name: "Deadlift",
            notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
            weightPerDateEntries: [100, 110, 120],
            repetitionsPerDateEntries: [5, 6, 5],
          },
        },
        jane_smith: {
          "Bulgarian Split Squat": {
            name: "Bulgarian Split Squat",
            notes: "Targets quads, glutes, and hamstrings. Place your rear foot on an elevated surface and keep your front knee tracking over your toes.",
            weightPerDateEntries: [40, 45, 50],
            repetitionsPerDateEntries: [12, 12, 12],
          },
          "Smith Machine Squats": {
            name: "Smith Machine Squats",
            notes: "Keep the bar positioned over the midfoot and engage your core for stability during the descent and ascent.",
            weightPerDateEntries: [100, 110, 115],
            repetitionsPerDateEntries: [8, 8, 8],
          },
        },
        default: {}, // Default user has no exercise data
      };
  
      // If exerciseName is missing or undefined, reject with 400 error
      if (!exerciseName) {
        reject({
          message: "Response code 400 (Bad Request): exercise-name is required",
          code: 400,
        });
      } else if (!exerciseData[username]) {
        // If the user does not exist in the data
        reject({
          message: "Response code 404 (Not Found): No data found for the specified username.",
          code: 404,
        });
      } else if (exerciseData[username][exerciseName]) {
        // If the user and the exercise data exist
        resolve(exerciseData[username][exerciseName]);
      } else {
        // If the exercise data doesn't exist for the user
        reject({
          message: "Response code 404 (Not Found): No progress data found for the specified exercise.",
          code: 404,
        });
      }
    });
  };

/**
 * Returns the three upcoming reservations of a user
 * FR5 - The user must be able to see their reservations
 *
 * username String the username of the connected person
 * returns List
 **/
exports.getMyReservations = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "date" : "date",
  "reservationsPerMuscleGroup" : [ 6, 6 ],
  "muscleGroup" : "muscleGroup",
  "time" : "time",
  "availability" : 0
}, {
  "date" : "date",
  "reservationsPerMuscleGroup" : [ 6, 6 ],
  "muscleGroup" : "muscleGroup",
  "time" : "time",
  "availability" : 0
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns the bodyweight, gender, activated goals, desired bodyweight and desired workout frequency
 * FR1  - The user must be able to edit their personal data
 *
 * username String the username of the connected person
 * returns PersonalInfo
 **/
exports.getPersonalInfo = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "gender" : "gender",
  "goalConsistencyNum" : 6,
  "goalBodyWeightNum" : 1,
  "bodyweight" : 0.8008282,
  "goals" : [ true, true ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Submits a reservation for a selected day and time
 * FR3 - A user must be able to make a reservation
 *
 * body Reservation A json object containing the Reservation info
 * day String the selected day
 * time String the selected time
 * musclegroup String the muscle group the user will train
 * username String the username of the connected person
 * no response value expected for this operation
 **/
exports.makeReservation = function(body,day,time,musclegroup,username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updates the progress entries of an existing exercise for a specific day
 * FR7 - The user must be able to track an exercise to Planner
 *
 * body Exercise A json object containing the Exercise
 * day Integer the selected day of the planner
 * username String the username of the connected person
 * no response value expected for this operation
 **/
exports.updateExerciseProgress = function(body,day,username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updates the bodyweight, gender, activated goals, desired bodyweight and desired workout frequency
 * FR1  - The user must be able to edit their personal data
 *
 * body PersonalInfo A json object containing the Personal info
 * username String the username of the connected person
 * no response value expected for this operation
 **/
exports.updatePersonalInfo = function(body,username) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

