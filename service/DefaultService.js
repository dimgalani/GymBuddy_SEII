'use strict';

// Mock dataset: Available reservations
const usernames = ["john_doe", "alice_wonder", "jane_smith", "default"];
const availableReservations = {
  1: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "time": "08:00 AM", "availability": 5 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:00 AM", "availability": 10 }
  ],
  2: [
    { "date": "2024-11-02", "reservationsPerMuscleGroup": [10, 11, 12, 13, 14], "time": "09:00 AM", "availability": 20 },
    { "date": "2024-11-02", "reservationsPerMuscleGroup": [20, 19, 18, 17, 16], "time": "11:00 AM", "availability": 30 }
  ],
  3: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "08:30 AM", "availability": 10 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:30 AM", "availability": 0 }
  ],
  4: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "09:30 AM", "availability": 10 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "11:30 AM", "availability": 0 }
  ],
  5: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "12:00 PM", "availability": 20 }
  ]
};

// Mock dataset: reservations per user
const userReservations = {
  john_doe: [
    { "date": "2024-11-01", "muscleGroup": "upper", "time": "08:00 AM" },
    { "date": "2024-11-02", "muscleGroup": "lower", "time": "10:00 AM" },
    { "date": "2024-11-03", "muscleGroup": "core", "time": "12:00 PM" },
    { "date": "2024-11-04", "muscleGroup": "cardio", "time": "06:00 PM" }
  ],
  alice_wonder: [
    { "date": "2024-11-01", "muscleGroup": "cardio", "time": "07:00 AM" },
    { "date": "2024-11-02", "muscleGroup": "core", "time": "09:30 AM" },
    { "date": "2024-11-03", "muscleGroup": "upper", "time": "11:00 AM" },
    { "date": "2024-11-04", "muscleGroup": "lower", "time": "04:30 PM" }
  ],
  jane_smith: [
    { "date": "2024-11-01", "muscleGroup": "lower", "time": "08:30 AM" },
    { "date": "2024-11-02", "muscleGroup": "cardio", "time": "11:00 AM" },
    { "date": "2024-11-03", "muscleGroup": "core", "time": "01:30 PM" },
    { "date": "2024-11-04", "muscleGroup": "upper", "time": "05:00 PM" }
  ],
  default: [
    { "date": "2024-11-01", "muscleGroup": "core", "time": "09:00 AM" },
    { "date": "2024-11-02", "muscleGroup": "upper", "time": "10:00 AM" },
    { "date": "2024-11-03", "muscleGroup": "lower", "time": "03:00 PM" },
    { "date": "2024-11-04", "muscleGroup": "cardio", "time": "07:00 PM" }
  ]
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

/*
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
*/
exports.checkGoalsFromProgress = function (day, username) {
  return new Promise(function (resolve, reject) {
    const userProgress = {
      john_doe: {
        1: [true, true, false, true, true],
        2: [true, true, true, true, true],
        3: [false, false, false, false, false],
      },
      jane_smith: {
        1: [true, false, true, false, true],
        2: [true, true, true, true, true],
        3: [true, false, false, false, true],
      },
      alice_wonder: {
        1: [false, false, false, false, false],
        2: [true, true, true, false, true],
        3: [true, true, true, true, true],
      },
      default: {
        1: [false, false, false, false, false],
      },
    };

    if (!Number.isInteger(day) || typeof username !== 'string') {
      // If the data types are incorrect
      reject({
        message: 'Response code 400 (Bad Request): Wrong data types for username or day.',
        code: 400,
      });
    } else if (userProgress[username] && userProgress[username][day]) {
      // If user and day data exist
      resolve(userProgress[username][day]);
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
/*
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
*/
exports.getAvailableReservations = function (day, username) {
  return new Promise(function (resolve, reject) {
    // Check if username exists
    if (!usernames.includes(username)) {
      reject({
        message: 'Response code 401 (Unauthorized): Not a valid username',
        code: 401
      });
    } else if (availableReservations[day]) {
      resolve(availableReservations[day]); // Return the reservations for the specified day
    } else {
      reject({
        message: 'Response code 404 (Not Found): No reservations found for the specified day.',
        code: 404
      });
    }
  });
};



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
exports.makeReservation = function (body, day, time, muscleGroup, username) {
  const validMuscleGroups = ["upper", "lower", "core", "cardio"];
  console.log(`Got day ${day}, time ${time}, muscleGroup ${muscleGroup}, username ${username}`)
  return new Promise(function (resolve, reject) {
    // Step 1: Validate data types
    if (
      typeof body !== "object" ||
      typeof day !== "string" ||
      typeof time !== "string" ||
      typeof muscleGroup !== "string" ||
      typeof username !== "string"
    ) {
      return reject({
        message: "Response code 400 (Bad Request): Invalid data types.",
        code: 400
      });
    }

    // Step 2: Check if the muscle group is valid
    if (!validMuscleGroups.includes(muscleGroup)) {
      return reject({
        message: `Response code 400 (Bad Request): Invalid muscle group. Must be one of ${validMuscleGroups.join(", ")}.`,
        code: 400
      });
    }

    // Step 3: Check if the username exists
    if (!userReservations[username]) {
      return reject({
        message: "Response code 401 (Unauthorized): Username not found.",
        code: 401
      });
    }

    // Step 4: Check for existing reservations at the same time
    const existingReservations = userReservations[username].filter(
      (reservation) => reservation.date === day && reservation.time === time
    );
    if (existingReservations.length > 0) {
      return reject({
        message: "Response code 400 (Bad Request): Time slot already reserved.",
        code: 400
      });
    }

    // Step 5: Create and append the reservation
    const newReservation = { date: day, muscleGroup, time };
    userReservations[username].push(newReservation);

    // Return the updated reservations for the user
    resolve(201);
  });
};



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

