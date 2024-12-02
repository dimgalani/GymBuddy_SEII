'use strict';

// // Placeholder for user settings
// const DefaultSettings = {
//   bodyweight: 75.0,
//   gender: "male",
//   goals: [false, false], // Example: weight loss goal active, others not
//   goalConsistencyNum: 6,
//   goalBodyWeightNum: 1,
// };

const UserSettings = [
  {
    username: "john_doe",
    settings: {
      bodyweight: null,
      gender: "male",
      goals: [true, false, true, true],
      goalConsistencyNum: 5,
      goalBodyWeightNum: 90.0,
    },
  },
  {
    username: "jane_smith",
    settings: {
      bodyweight: 65.0,
      gender: "female",
      goals: [false, true, true, true],
      goalConsistencyNum: 7,
      goalBodyWeightNum: 55.00,
    },
  },
  {
    username: "default",
    settings: {
      bodyweight: 75.00,
      gender: "male",
      goals: [false, false, false, false],
      goalConsistencyNum: 6,
      goalBodyWeightNum: 80.0,
    },
  },
];

const ExerciseCatalog = [
  {
    name: "Lat Pull Down",
    notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-do...",
    weightPerDateEntries: [40, 40],
    repetitionsPerDateEntries: [8, 10],
  },
  {
    name: "Deadlift",
    notes: "It is a compound strength exercise. Targets several muscle groups. Setup: Stand with your feet hip-widt...",
    weightPerDateEntries: [45, 45],
    repetitionsPerDateEntries: [8, 10],
  },
];

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
exports.checkGoalsFromInfo = function (currentBodyWeight, username) {
  return new Promise(function (resolve, reject) {
    // const storedBodyWeight = DefaultSettings.bodyweight;
    // Find the user in the array
    const user = UserSettings.find((user) => user.username === username);
    
    // Throw 401 error if the username is unknown
    if (!user) {
      reject({
        message: 'Response code 401 (Unauthorized): Not a valid username',
        code: 401,
      });
    }

    // If the current body weight is not provided in the request
    else if (!currentBodyWeight) {
      reject({
        message: 'Response code 400 (Bad Request): No currentBodyWeight parameter provided.',
        code: 400,
      });
    }
    else if (!Number.isInteger(currentBodyWeight)) {
      // If the data types are incorrect
      reject({
        message: 'Response code 400 (Bad Request): Wrong data types for currentBodyWeight.',
        code: 400,
      });
    }

    // If the user has the weight loss/gain goal active //TODO: need to change the index to the correct one
    else if (user.settings.goals[3]){ 
      // Get the user's body weight
      const storedBodyWeight = user.settings.bodyweight;
      // If the user hasn't set his previous body weight - throw 404 error
      if(storedBodyWeight === null){
        reject({
          message: 'Response code 404 (Not Found): Previous BodyWeight data not found',
          code: 404,
        });
      }

      const GoalBodyWeight = user.settings.goalBodyWeightNum;
      // If the user hasn't set his goal body weight - throw 404 error
      if(!GoalBodyWeight){
        reject({
          message: 'Response code 404 (Not Found): Goal body weight data not found',
          code: 404,
        });
      }

      // Check if the current weight is closer to the goal weight than the stored weight
      if (Math.abs(GoalBodyWeight - currentBodyWeight) < Math.abs(GoalBodyWeight - storedBodyWeight)) {
        // If the user has reached the goal or has exceeded it
        if (currentBodyWeight === GoalBodyWeight || // If the user has reached the goal
            (storedBodyWeight > GoalBodyWeight && currentBodyWeight < GoalBodyWeight) || // If the user wants to lose weight and has exceeded the goal
            (storedBodyWeight < GoalBodyWeight && currentBodyWeight > GoalBodyWeight)) { // If the user wants to gain weight and has exceeded the goal
          resolve({ message: "Victory Animation"});
        }
      } else {
        // If the user has not reached the goal
        resolve({ message: "No progress. Boo hoo :("});
      }
  } else{
    // If the user does not have the weight loss/gain goal active
    resolve({ message: "No weight loss gain goal active" });}
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
      // resolve({
      //   message: 'Exercise successfully added to the catalog',
      //   exercise: ExerciseCatalog[ExerciseCatalog.length - 1],
      //   code: 201,
      // });

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
// Update personal info function
exports.updatePersonalInfo = function ( newSettings, username,) {
  return new Promise(function (resolve, reject) {
    // Find the user in the UserSettings array
    const user = UserSettings.find((user) => user.username === username);

    if (!user) {
      reject({
        message: 'Response code 401 (Unauthorized): Not a valid username',
        code: 401,
      });
    }
    if(!Number.isInteger(newSettings.bodyweight) || newSettings.bodyweight < 0 || !String(newSettings.gender) ||
       !Array.isArray(newSettings.goals) || newSettings.goals.length !== 4 || !newSettings.goals.every((value) => typeof value === "boolean") ||
       !Number.isInteger(newSettings.goalConsistencyNum) || !Number.isInteger(newSettings.goalBodyWeightNum) || newSettings.goalConsistencyNum < 0 || newSettings.goalBodyWeightNum < 0 ) {
      reject({
        message: 'Response code 400 (Bad Request): Wrong data types for bodyweight.',
        code: 400,
      });
    }
      
    
    // Update the user's settings
    user.settings.bodyweight = newSettings.bodyweight;
    user.settings.gender = newSettings.gender;
    user.settings.goalConsistencyNum = newSettings.goalConsistencyNum;
    user.settings.goalBodyWeightNum = newSettings.goalBodyWeightNum;
    user.settings.goals = newSettings.goals;
    // Resolve with the updated settings and the message
    resolve({
      updatedInfo: user.settings,
    });
  });
};
