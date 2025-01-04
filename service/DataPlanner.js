// Description: This file contains structured data and helper methods for managing planner and exercise data.

// Exercise data for each user
const exerciseData = {
    john_doe: createUserExerciseData([
      createExercise("Lat Pull Down", "Targets the latissimus dorsi muscles, which are the large muscles of the back.", [40.0, 42.5, 45.0], [10, 12, 14]),
      createExercise("Hip Thrust", "Engage glutes throughout the lift. Focus on keeping your upper back against the bench and avoid arching your lower back.", [80, 85, 90], [10, 12, 10])
    ]),
    alice_wonders: createUserExerciseData([
      createExercise("Bulgarian Split Squat", "Targets quads, glutes, and hamstrings. Place your rear foot on an elevated surface and keep your front knee tracking over your toes.", [45, 50, 55], [10, 12, 10]),
      createExercise("deadlift", "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.", [100, 110, 120], [5, 6, 5])
    ]),
    jane_smith: createUserExerciseData([
      createExercise("Bulgarian Split Squat", "Targets quads, glutes, and hamstrings. Place your rear foot on an elevated surface and keep your front knee tracking over your toes.", [40, 45, 50], [12, 12, 12]),
      createExercise("Smith Machine Squats", "Keep the bar positioned over the midfoot and engage your core for stability during the descent and ascent.", [100, 110, 115], [8, 8, 8]),
      createExercise("deadlift", "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.", [], [])
    ]),
    default: {} // Default user with no exercise data
  };
  
  // Planner data for day-of exercises
  const dayofPlannerData = {
    john_doe: createDayPlanner(1, [
      createExercise("Romanian Deadlift", "Focus on form", [60, 65], [8, 12]),
      createExercise("Hip Thrust", "Keep back straight", [80, 85], [10, 15])
    ]),
    jane_smith: createDayPlanner(2, [
      createExercise("Bulgarian Split Squat", "Increase weight next time", [40, 45], [12, 12]),
      createExercise("Smith Machine Squats", "Slow descent", [100, 110], [8, 8])
    ]),
    default: createDayPlanner(1, []) // Default day planner with no exercises
  };
  
// Planner data for users
const usersPlanner = [
    createUserPlanner({
      username: "john_doe",
      exercise: {
        name: "Bench Press",
        notes: "note1",
        weightEntries: [70, 80, 80, 80, 85, 90, null, null, null, null],
        repetitionEntries: [10, 10, 10, 10, 10, null, null, null, null, null]
      }
    }),
    
    createUserPlanner({
      username: "jane_smith",
      exercise: {
        name: "Squat",
        notes: "note2",
        weightEntries: [100, 110, 110, 110, 110, 110, null, null, null, null],
        repetitionEntries: [5, 5, 5, 5, 5, 5, null, null, null, null]
      }
    })
  ];
  
// Helper function to create a user's exercise data
function createUserExerciseData(exercises) {
    return exercises.reduce((acc, exercise) => {
      if (exercise.name) {
        const formattedKey = formatKey(exercise.name);
        acc[formattedKey] = { ...exercise };
      } else {
        console.warn('Missing name for exercise:', exercise);  // Add a warning if name is missing
      }
      return acc;
    }, {});
  }
  
// Refactored helper function to create an exercise object
function createExercise({ name, notes, weightEntries, repetitionEntries }) {
    return {
      name,
      notes,
      weightPerDateEntries: weightEntries,
      repetitionsPerDateEntries: repetitionEntries
    };
  }
  
  // Helper function to create a day planner for a user
  function createDayPlanner(currentDate, exercisesList) {
    return { [currentDate]: { currentDate, exercisesList } };
  }
  
// Refactored helper function to create a user planner
function createUserPlanner({ username, exercise }) {
    return {
      username,
      exercise: createExercise(exercise)
    };
  }
  
// Helper function to format a string into a key
function formatKey(str) {
    if (typeof str !== 'string') {
      console.error('Invalid string for formatKey:', str);  // Add an error log if str is not a valid string
      return '';  // Return an empty string or some default key if invalid input is provided
    }
    return str.toLowerCase().replace(/\s+/g, '-');
  }
  
  // Exporting the structured data
  module.exports = {
    exerciseData,
    dayofPlannerData,
    usersPlanner
  };
  