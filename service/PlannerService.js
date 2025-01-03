'use strict';
const { usernames, UserSettings, ExerciseCatalog, userReservations, availableReservations, userProgress, usersPlanner } = require("./Database");
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
 * Returns the arrays of progress (weights, reps) for the chosen exercise so that the diagrams will be generated
 * FR9 - The user must be able to see his progress at an exercise
 *
 * username String the username of the connected person
 * exerciseName Exercise the chosen exercise
 * returns Exercise
**/
exports.getExerciseProgress = function (username, exerciseName) {
  return new Promise(function (resolve, reject) {
    const exerciseData = {
      john_doe: {
        "lat-pull-down": {
          name: "Lat Pull Down",
          notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-down machine with your knees securely under the pads. Adjust the thigh pads to fit comfortably against your thighs. Grasp the wide bar with an overhand grip, hands slightly wider than shoulder-width apart.",
          weightPerDateEntries: [40.0, 42.5, 45.0],
          repetitionsPerDateEntries: [10, 12, 14],
        },
        "hip-thrust": {
          name: "Hip Thrust",
          notes: "Engage glutes throughout the lift. Focus on keeping your upper back against the bench and avoid arching your lower back.",
          weightPerDateEntries: [80, 85, 90],
          repetitionsPerDateEntries: [10, 12, 10],
        },
      },
      alice_wonders: {
        "bulgarian-split-squat": {
          name: "Bulgarian Split Squat",
          notes: "Targets quads, glutes, and hamstrings. Place your rear foot on an elevated surface and keep your front knee tracking over your toes.",
          weightPerDateEntries: [45, 50, 55],
          repetitionsPerDateEntries: [10, 12, 10],
        },
        "deadlift": {
          name: "deadlift",
          notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
          weightPerDateEntries: [100, 110, 120],
          repetitionsPerDateEntries: [5, 6, 5],
        },
      },
      jane_smith: {
        "bulgarian-split-squat": {
          name: "Bulgarian Split Squat",
          notes: "Targets quads, glutes, and hamstrings. Place your rear foot on an elevated surface and keep your front knee tracking over your toes.",
          weightPerDateEntries: [40, 45, 50],
          repetitionsPerDateEntries: [12, 12, 12],
        },
        "smith-machine-squats": {
          name: "Smith Machine Squats",
          notes: "Keep the bar positioned over the midfoot and engage your core for stability during the descent and ascent.",
          weightPerDateEntries: [100, 110, 115],
          repetitionsPerDateEntries: [8, 8, 8],
        },
        "deadlift": {
          name: "deadlift",
          notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
          weightPerDateEntries: [],
          repetitionsPerDateEntries: [],
        }
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