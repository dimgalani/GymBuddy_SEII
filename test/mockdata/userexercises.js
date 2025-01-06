/*
This files contains the mock data regarding the planner catalog tests
It is being imported in plannercatalog.js
Tests are located in plannercatalog.test.js
*/

// Default notes from different file
const { DEFAULT_NOTES } = require("./defaultplanner")

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

module.exports = {johnDoeLatPulldown, janeSmithDeadlift}