'use strict';
const { usersPlanner, exerciseData, dayofPlannerData } = require("./DataPlanner");
/**
 * Returns a list of the existing exercise progress entries for a selected day
 * FR7 - The user must be able to track an exercise to Planner
 *
 * username String the username of the connected person
 * day String the selected day of the planner
 * returns DayofPlanner
 **/
exports.getDayofPlanner = function (day, username) {
    return new Promise(function (resolve, reject) {  
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
 * Returns the arrays of progress (weights, reps) for the chosen exercise so that the diagrams will be generated
 * FR9 - The user must be able to see his progress at an exercise
 *
 * username String the username of the connected person
 * exerciseName Exercise the chosen exercise
 * returns Exercise
**/
exports.getExerciseProgress = function (username, exerciseName) {
  return new Promise(function (resolve, reject) {

    // If exerciseName is missing or undefined, reject with 400 error
    if (!exerciseName) {
      reject({
        message: "Response code 400 (Bad Request): exercise-name is required",
        code: 400,
      });
    } else if (!exerciseData[username]) {
      // If the user does not exist in the data
      reject({
        message: "Response code 401 (Not Found): Username not found.",
        code: 401,
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
    try {
      validateInputs(day, name, weight, reps, username);
      const user = findUser(username);
      const exercise = findExercise(user, name);
      updateProgress(user, exercise, day, weight, reps);
      resolve({
        updatedProgress: exercise,
        message: "Progress updated successfully",
        code: 200
      });
    } catch (error) {
      reject(error);
    }
  });
};
// Function to validate the input data
function validateInputs(day, name, weight, reps, _) {
  if (!day || !name || !weight || !reps) {
    throw {
      message: "Missing required fields",
      code: 400
    };
  }
}
// Function to find the user
function findUser(username) {
  const user = usersPlanner.find((entry) => entry.username === username);
  if (!user) {
    throw {
      message: "User not found",
      code: 401
    };
  }
  return user;
}
// Function to find the exercise
function findExercise(user, name) {
  const exercise = user.exercise;
  if (!exercise || exercise.name !== name) {
    throw {
      message: "Exercise not found for user",
      code: 404
    };
  }
  return exercise;
}
// Function to update the progress
function updateProgress(user, _, day, weight, reps) {
  user.exercise.weightPerDateEntries[day - 1] = weight;
  user.exercise.repetitionsPerDateEntries[day - 1] = reps;
}