// Default notes from different file
const { DEFAULT_NOTES, newExercise, planner, benchPress } = require("./defaultplanner")
const { latPullDown, deadlift} = require("./defaultexercises")

// Data used for john_doe user exercise tests
const johnDoeLatPulldown = {
    name: "Lat Pull Down",
        notes: DEFAULT_NOTES.latPullDown,
        repetitionsPerDateEntries: [10, 12, 14],
        weightPerDateEntries: [40.0, 42.5, 45.0],
}

// Data used for jane_smith user exercise tests
const janeSmithDeadlift = {
    name: "deadlift",
        notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
        repetitionsPerDateEntries: [],
        weightPerDateEntries: [],
}

// Data used for john_doe user planner tests
const johnDoeDeadlift = {
    name: "Romanian Deadlift",
    notes: "Focus on form",
    repetitionsPerDateEntries: [8, 12],
    weightPerDateEntries: [60, 65],
}
const johnDoeHipThrust = {
    name: "Hip Thrust",
    notes: "Keep back straight",
    repetitionsPerDateEntries: [10, 15],
    weightPerDateEntries: [80, 85],
}

// Data used for default user exercise and planner tests
const defaultUser = {latPullDown, deadlift, benchPress, newExercise, planner}

module.exports = { defaultUser, johnDoeLatPulldown, janeSmithDeadlift, johnDoeDeadlift, johnDoeHipThrust};
