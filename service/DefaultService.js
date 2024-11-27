'use strict';

// Placeholder for user settings
const DefaultSettings = {
  bodyweight: 75.0,
  gender: "male",
  goals: [false, false], // Example: weight loss goal active, others not
  goalConsistencyNum: 6,
  goalBodyWeightNum: 1,
};

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
// exports.checkGoalsFromInfo = function (username, currentBodyWeight) {
//   return new Promise(function (resolve, reject) {
//     const storedBodyWeight = DefaultSettings.bodyweight;

//     // Check if the current weight is less than the stored weight
//     if (currentBodyWeight < storedBodyWeight) {
//       resolve("Congratulations");
//     } else {
//       resolve("Keep going!");
//     }
//   });
// };


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
exports.getDayofPlanner = function(username,day) {
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
exports.getExerciseProgress = function(username,exerciseName) {
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
}


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
exports.updatePersonalInfo = function (newSettings) {
  return new Promise(function (resolve, reject) {
    // Update the user's personal information, including bodyweight
    // First, update the goals - if the user just activated the weight loss goal and achieved it, the message will be "Congratulations!"
    DefaultSettings.goals = newSettings.goals;
    // Before updating, call checkGoalsFromInfo to check if the goal has been achieved
    const checkMessage = checkGoalsFromInfo(newSettings.bodyweight);    
    
    // Update the settings
    DefaultSettings.bodyweight = newSettings.bodyweight;
    DefaultSettings.gender = newSettings.gender;
    DefaultSettings.goals = newSettings.goals;
    DefaultSettings.goalConsistencyNum = newSettings.goalConsistencyNum;
    DefaultSettings.goalBodyWeightNum = newSettings.goalBodyWeightNum; 

    // Return the updated settings and the message from checkGoalsFromInfo
    resolve({
      updatedInfo: DefaultSettings,
      message: checkMessage
    });
  });
};

// Automatically trigger the check when the bodyweight is updated
function checkGoalsFromInfo(currentBodyWeight) {
  const storedBodyWeight = DefaultSettings.bodyweight;

  // Compare the current bodyweight with the stored bodyweight
  if (DefaultSettings.goals[0] && currentBodyWeight < storedBodyWeight) {
    return "Congratulations!";
  } else {
    return "Keep going! You're on the right track!";
  }
}