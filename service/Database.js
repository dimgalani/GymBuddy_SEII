// Purpose: Mock data for a fitness-related application. 
// This file contains mock datasets for user settings, exercise catalog, 
// available reservations, user reservations, and user progress.

// Mock dataset: Usernames
const usernames = ["john_doe", "alice_wonder", "jane_smith", "default"];

// Mock dataset: User settings
const userSettings = [
  createUserSettings("john_doe", { bodyweight: null, gender: "male", goals: [true, false, true, true], goalConsistencyNum: 5, goalBodyWeightNum: 90.0 }),
  createUserSettings("jane_smith", { bodyweight: 65.0, gender: "female", goals: [false, true, true, true], goalConsistencyNum: 7, goalBodyWeightNum: 55.0 }),
  createUserSettings("default", { bodyweight: 75.0, gender: "male", goals: [false, false, false], goalConsistencyNum: 6, goalBodyWeightNum: 80.0 }),
  createUserSettings("nathaniel_brooks", { bodyweight: 75.0, gender: "male", goals: [false, false, false, true], goalConsistencyNum: 6, goalBodyWeightNum: null }),
  createUserSettings("adrian_carter", { bodyweight: 75.0, gender: "male", goals: [false, false, false, true], goalConsistencyNum: 6, goalBodyWeightNum: 90.0 }),
];

/**
 * Creates a user settings object.
 * @param {string} username - The username of the user.
 * @param {Object} settings - An object containing user settings.
 * @returns {Object} User settings object.
 */
function createUserSettings(username, settings) {
  return { username, settings };
}

// Mock dataset: Exercise catalog
const exerciseCatalog = [
  createExercise("Lat Pull Down", "Targets the latissimus dorsi muscles.", [40, 40], [8, 10]),
  createExercise("Deadlift", "Compound exercise targeting multiple muscle groups.", [45, 45], [8, 10]),
];

/**
 * Creates an exercise entry.
 * @param {string} name - Name of the exercise.
 * @param {string} notes - Notes describing the exercise.
 * @param {number[]} weightEntries - Array of weights recorded.
 * @param {number[]} repsEntries - Array of repetitions recorded.
 * @returns {Object} Exercise entry object.
 */
function createExercise(name, notes, weightEntries, repsEntries) {
  return { name, notes, weightPerDateEntries: weightEntries, repetitionsPerDateEntries: repsEntries };
}

// Mock dataset: Available reservations
const availableReservations = {
  1: [
    createReservation("2024-11-01", [1, 2, 3, 4, 5], "08:00", 50),
    createReservation("2024-11-01", [0, 0, 0, 0, 0], "10:00", 50),
  ],
  2: [
    createReservation("2024-11-02", [10, 11, 12, 13, 14], "09:00", 50),
    createReservation("2024-11-02", [20, 19, 18, 17, 16], "11:00", 50),
  ],
  3: [
    createReservation("2024-11-01", [0, 0, 0, 0, 0], "08:30", 50),
    createReservation("2024-11-01", [0, 0, 0, 0, 0], "10:30", 50),
  ],
  4: [
    createReservation("2024-11-01", [0, 0, 0, 0, 0], "09:30", 50),
    createReservation("2024-11-01", [0, 0, 0, 0, 0], "11:30", 50),
  ],
  5: [
    createReservation("2024-11-01", [0, 0, 0, 0, 0], "12:00", 50),
  ],
};

/**
 * Creates a reservation entry.
 * @param {string} date - Date of the reservation.
 * @param {number[]} reservationsPerGroup - Array of reservation counts per muscle group.
 * @param {string} time - Time of the reservation.
 * @param {number} availability - Total availability for the time slot.
 * @returns {Object} Reservation entry object.
 */
function createReservation(date, reservationsPerGroup, time, availability) {
  return { date, reservationsPerMuscleGroup: reservationsPerGroup, time, availability };
}

// Mock dataset: User reservations
const userReservations = {
  john_doe: [
    createUserReservation("2024-11-01", "upper", "08:00"),
    createUserReservation("2024-11-02", "lower", "10:00"),
    createUserReservation("2024-11-03", "core", "12:00"),
    createUserReservation("2024-11-04", "cardio", "06:00"),
  ],
  alice_wonder: [
    createUserReservation("2024-11-01", "cardio", "07:00"),
    createUserReservation("2024-11-02", "core", "09:30"),
    createUserReservation("2024-11-03", "upper", "11:00"),
    createUserReservation("2024-11-04", "lower", "16:30"),
  ],
  jane_smith: [
    createUserReservation("2024-11-01", "lower", "08:30"),
    createUserReservation("2024-11-02", "cardio", "11:00"),
    createUserReservation("2024-11-03", "core", "13:30"),
    createUserReservation("2024-11-04", "upper", "17:00"),
  ],
  default: [],
};

/**
 * Creates a user reservation entry.
 * @param {string} date - Date of the reservation.
 * @param {string} muscleGroup - Muscle group targeted in the reservation.
 * @param {string} time - Time of the reservation.
 * @returns {Object} User reservation entry object.
 */
function createUserReservation(date, muscleGroup, time) {
  return { date, muscleGroup, time };
}

// Mock dataset: User progress
const userProgress = {
  john_doe: createUserProgress({
    1: [true, true, false, true, true],
    2: [true, true, true, true, true],
    3: [false, false, false, false, false],
  }),
  jane_smith: createUserProgress({
    1: [true, false, true, false, true],
    2: [true, true, true, true, true],
    3: [true, false, false, false, true],
  }),
  alice_wonder: createUserProgress({
    1: [false, false, false, false, false],
    2: [true, true, true, false, true],
    3: [true, true, true, true, true],
  }),
  default: createUserProgress({
    1: [false, false, false, false, false],
  }),
};

/**
 * Creates a user progress object.
 * @param {Object} progress - Progress data by week.
 * @returns {Object} User progress object.
 */
function createUserProgress(progress) {
  return progress;
}

// Export the mock data
module.exports = {
  usernames,
  userSettings,
  exerciseCatalog,
  availableReservations,
  userReservations,
  userProgress,
};
