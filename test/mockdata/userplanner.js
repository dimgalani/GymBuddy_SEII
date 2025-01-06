/*
This files contains the mock data regarding the planner catalog tests
It is being imported in plannercatalog.js
Tests are located in plannercatalog.test.js
*/

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

module.exports = {johnDoeDeadlift, johnDoeHipThrust}