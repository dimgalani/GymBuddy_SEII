'use strict';

const { use } = require("..");

const usernames = ["john_doe", "alice_wonder", "jane_smith", "default"];

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
      goals: [false, false, false, ],
      goalConsistencyNum: 6,
      goalBodyWeightNum: 80.0,
    },
  },
  {
    username: "nathaniel_brooks",
    settings: {
      bodyweight: 75.00,
      gender: "male",
      goals: [false, false, false, true],
      goalConsistencyNum: 6,
      goalBodyWeightNum: null,
    },
  },
  {
    username: "adrian_carter",
    settings: {
      bodyweight: 75.00,
      gender: "male",
      goals: [false, false, false, true],
      goalConsistencyNum: 6,
      goalBodyWeightNum: 90.00,
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
// Mock dataset: Available reservations
const availableReservations = {
  1: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "time": "08:00", "availability": 50 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:00", "availability": 50 }
  ],
  2: [
    { "date": "2024-11-02", "reservationsPerMuscleGroup": [10, 11, 12, 13, 14], "time": "09:00", "availability": 50 },
    { "date": "2024-11-02", "reservationsPerMuscleGroup": [20, 19, 18, 17, 16], "time": "11:00", "availability": 50 }
  ],
  3: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "08:30", "availability": 50 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:30", "availability": 50 }
  ],
  4: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "09:30", "availability": 50 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "11:30", "availability": 50 }
  ],
  5: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "12:00", "availability": 50 }
  ]
};

// Mock dataset: reservations per user
const userReservations = {
  john_doe: [
    { date: "2024-11-01", muscleGroup: "upper", time: "08:00" },
    { date: "2024-11-02", muscleGroup: "lower", time: "10:00" },
    { date: "2024-11-03", muscleGroup: "core", time: "12:00" },
    { date: "2024-11-04", muscleGroup: "cardio", time: "06:00" }
  ],
  alice_wonder: [
    { date: "2024-11-01", muscleGroup: "cardio", time: "07:00" },
    { date: "2024-11-02", muscleGroup: "core", time: "09:30" },
    { date: "2024-11-03", muscleGroup: "upper", time: "11:00" },
    { date: "2024-11-04", muscleGroup: "lower", time: "16:30" }
  ],
  jane_smith: [
    { date: "2024-11-01", muscleGroup: "lower", time: "08:30" },
    { date: "2024-11-02", muscleGroup: "cardio", time: "11:00" },
    { date: "2024-11-03", muscleGroup: "core", time: "13:30" },
    { date: "2024-11-04", muscleGroup: "upper", time: "17:00" }
  ],
  default: [
    { date: "2024-11-01", muscleGroup: "core", time: "09:00" },
    { date: "2024-11-02", muscleGroup: "upper", time: "10:00" },
    { date: "2024-11-03", muscleGroup: "lower", time: "03:00" },
    { date: "2024-11-04", muscleGroup: "cardio", time: "19:00" }
  ]
};

// Mock dataset: user goals for progress
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

const usersPlanner = [
  {
    username: "john_doe",
    exercise: {
       notes: "note1",
       name: "Bench_Press",
       weightPerDateEntries: [70, 80, 80, 80, 85, 90, null, null, null, null],
       repetitionsPerDateEntries: [10, 10, 10, 10, 10, null, null, null, null, null]
     }
  },
    {
      username: "jane_smith",
      exercise: {
      
       notes: "note2",
       name: "Squat",
       weightPerDateEntries: [100, 110, 110, 110, 110, 110, null, null, null, null],
       repetitionsPerDateEntries: [5, 5, 5, 5, 5, 5, null, null, null, null]
     }
    }
];

/**
 * Cancels a reservation by deleting it
 * FR4 - The user must be able to cancel a reservation
 *
 * username String the username of the connected person
 * day Long the day of the reservation
 * no response value expected for this operation
 **/
exports.cancelReservation = function (day, time, username) {
  return new Promise(function (resolve, reject) {
    // Step 1: Validate data types
    if (typeof username !== "string" || typeof day !== "string" || typeof time !== "string") {
      return reject({
        message: "Response code 400 (Bad Request): Invalid data types.",
        code: 400
      });
    }

    // Step 2: Check if the username exists
    if (!userReservations[username]) {
      return reject({
        message: "Response code 401 (Unauthorized): Username not found.",
        code: 401
      });
    }

    // Step 3: Check if the reservation exists
    const reservationIndex = userReservations[username].findIndex(
      (reservation) => reservation.date === day && reservation.time === time
    );

    if (reservationIndex === -1) {
      return reject({
        message: "Response code 404 (Not Found): Reservation does not exist.",
        code: 404
      });
    }

    // Step 4: Delete the reservation
    userReservations[username].splice(reservationIndex, 1);

    // Return success response
    resolve({
      message: "Reservation successfully canceled.",
      code: 202
    });
  });
};


/**
 * Returns true/false depending bodyweight goal progress
 * FR10 - The system must be able to notify the user when their goals have been achieved
 *
 * username String the username of the connected person
 * currentBodyWeight Float 
 * returns Boolean
 * GET /user/{usename}/settings/goals
 **/
exports.checkGoalsFromInfo = function (currentBodyWeight, username) {
  return new Promise(function (resolve, reject) {
    // const storedBodyWeight = DefaultSettings.bodyweight;
    // Find the user in the array
    const user = UserSettings.find((user) => user.username === username);
    
    // Throw 401 error if the username is unknown
    if (!user) {
      //* OK
      reject({
        message: 'Response code 401 (Unauthorized): Not a valid username',
        code: 401,
      });
    }

    // If the current body weight is not provided in the request
    else if (!currentBodyWeight) {
      //* OK
      reject({
        message: 'Response code 400 (Bad Request): No currentBodyWeight parameter provided.',
        code: 400,
      });
    }
    else if (!Number.isInteger(currentBodyWeight)) {
      // If the data types are incorrect
      //* OK
      reject({
        message: 'Response code 400 (Bad Request): Wrong data types for currentBodyWeight.',
        code: 400,
      });
    }

    // If the user has the weight loss/gain goal active
    else if (user.settings.goals[3]){ 
      // Get the user's body weight
      const storedBodyWeight = user.settings.bodyweight;
      // If the user hasn't set his previous body weight - throw 404 error
      if(storedBodyWeight === null){
        //* OK
        reject({
          message: 'Response code 404 (Not Found): Previous BodyWeight data not found',
          code: 404,
        });
      }

      const GoalBodyWeight = user.settings.goalBodyWeightNum;
      // If the user hasn't set his goal body weight - throw 404 error
      if(!GoalBodyWeight){
        //* OK
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
              resolve({ 
                //* OK
                message: "Victory Animation",
                code: 200,
              });
        }
        else
        {
          // If the user is closer to the goal but has not reached it yet
          resolve({ 
            //* OK
            message: "Keep trying. You are closer to your goal",
            code: 200,
          });
        }
      } 
      else
      {
        // If the user is further from the goal
        resolve({ 
          //* OK
          message: "You can do better! I believe in you!",
          code: 200,
        });
      }
  } 
  else
    {
      // If the user does not have the weight loss/gain goal active
      resolve({ 
        //* OK
        message: "No weight loss/gain goal active",
        code: 200,
      });
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

exports.checkGoalsFromProgress = function (day, username) {
  return new Promise(function (resolve, reject) {   
    if (!Number.isInteger(day) || typeof username !== 'string') {
      // If the data types are incorrect
      reject({
        message: 'Response code 400 (Bad Request): Wrong data types for username or day.',
        code: 400,
      });
    } else if (userProgress[username] && userProgress[username][day]) {
      // If user and day data exist
      resolve({
          message: userProgress[username][day],
          code: 200
      });
    } else {
      reject({
        message: 'Response code 400 (Bad Request): Wrong data types for username or day.',
        code: 400,
      });
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
 * Returns all the reservations' details for a specific day (time, available seats)
 * FR2 - The user must be able to see the availability of a certain date and time
 *
 * username String the username of the connected person
 * day String the day selected for a reservation
 * returns List
 **/

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
exports.getMyReservations = function (username) {
  return new Promise(function (resolve, reject) {
    // Validate username
    if (!usernames.includes(username)) {
      return reject({
        message: 'Response code 401 (Unauthorized): Not a valid username',
        code: 401
      });
    }

    // Get reservations for the username or return empty array if none
    const reservations = availableReservations[username] || [];
    resolve(reservations);
  });
};




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
exports.makeReservation = function (body, username) {
  const validMuscleGroups = ["upper", "lower", "core", "cardio"];

  return new Promise(function (resolve, reject) {
    // Step 1: Validate data types
    if (
      typeof body.date !== "string" ||
      typeof body.time !== "string" ||
      typeof body.muscleGroup !== "string" ||
      typeof username !== "string"
    ) {
      return reject({
        message: "Response code 400 (Bad Request): Invalid data types.",
        code: 400
      });
    }

    // Step 2: Check if the muscle group is valid
    if (!validMuscleGroups.includes(body.muscleGroup)) {
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
      (reservation) => reservation.date === body.date && reservation.time === body.time
    );
    if (existingReservations.length > 0) {
      return reject({
        message: "Response code 409 (Conflict): Time slot already reserved.",
        code: 409
      });
    }

    // Step 5: Create and append the reservation
    const newReservation = { date: body.date, muscleGroup: body.muscleGroup, time: body.time };
    userReservations[username].push(newReservation);

    // Return the updated reservations for the user
    resolve({
      message: "Reservation successfully created.",
      code: 201
    });
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
exports.updateExerciseProgress = function (day, name, weight, reps, username) {
  return new Promise(function (resolve, reject) {
    // Validate username
    const user = usersPlanner.find((entry) => entry.username === username);


    if (!day || !name || !weight || !reps) {
      reject({
          message: "Missing required fields",
          code: 400
      });
      return;
  }

    if (!user) {
      return reject({
        message: "User not found",
        code: 401
      });
    }

    const exercise  = user.exercise;

    if (!exercise || exercise.name !== name) {
      return reject({
        message: "Exercise not found for user",
        code: 404
      });
    }

    if (!exercise) {
      return reject({ message: "Exercise not found", code: 404 });
    }

    // Update the exercise progress for the specified day (adjusting for zero-based index)
    user.exercise.weightPerDateEntries[day - 1] = weight;
    user.exercise.repetitionsPerDateEntries[day - 1] = reps;

    resolve({
      updatedProgress: user.exercise,
      message: "Progress updated successfully",
      code: 200
    });
  });
};




/**
 * Updates the bodyweight, gender, activated goals, desired bodyweight and desired workout frequency
 * FR1  - The user must be able to edit their personal data
 *
 * body PersonalInfo A json object containing the Personal info
 * username String the username of the connected person
 * no response value expected for this operation
 * PUT /user/{username}/settings
 **/
// Update personal info function
exports.updatePersonalInfo = function ( newSettings, username,) {
  return new Promise(function (resolve, reject) {
    // Find the user in the UserSettings array
    const user = UserSettings.find((user) => user.username === username);
    if (!user) {
      console.log("user not found");
      reject({
        message: 'Response code 401 (Unauthorized): Not a valid username',
        code: 401,
      });
    }
    if(!Number.isInteger(newSettings.bodyweight) || newSettings.bodyweight < 0 || !String(newSettings.gender) ||
       !Array.isArray(newSettings.goals) || newSettings.goals.length !== 4 || !newSettings.goals.every((value) => typeof value === "boolean") ||
       !Number.isInteger(newSettings.goalConsistencyNum) || !Number.isInteger(newSettings.goalBodyWeightNum) || newSettings.goalConsistencyNum < 0 || newSettings.goalBodyWeightNum < 0 ) {
        reject({
        message: 'Response code 400 (Bad Request): Wrong data types.',
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
      message: 'Response code 200 (OK). Settings successfully updated',
      code: 200,
    });
  });
};
