/*
This file gathers all the mock data and is used to import only
one file in the plannercatalog.test.js test file
*/

// Default notes object to reduce complexity
const DEFAULT_NOTES = {
    latPullDown: "Targets the latissimus dorsi muscles, which are the large muscles of the back.",
    deadlift: "It is a compound strength exercise. Targets several muscle groups.",
    benchPress: "Targets the pectoral muscles, triceps, and anterior deltoids.",
};

// used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
const newExercise = {name: "Deadlift", notes: DEFAULT_NOTES.deadlift,}
// used by "GET /user/{username}/planner with Default User"
const planner = {
    currentDate: 1,
    exercisesList: [],
}
// used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
const benchPress = {
    name: "Bench Press",
    notes: DEFAULT_NOTES.benchPress,
}
// used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
var repetitionsPerDateEntries = [8,10]
var weightPerDateEntries = [45,45] // update value for new data format
const deadlift = {
    name: "Deadlift",
    notes: DEFAULT_NOTES.deadlift,
    repetitionsPerDateEntries: repetitionsPerDateEntries,
    weightPerDateEntries: weightPerDateEntries,
}

// used by "GET /user/{usename}/planner/catalog returns correct response and status code"
var repetitionsPerDateEntries = [8,10]
var weightPerDateEntries = [40,40]
const latPullDown = {
    name: "Lat Pull Down",
        notes: DEFAULT_NOTES.latPullDown,
        repetitionsPerDateEntries: repetitionsPerDateEntries,
        weightPerDateEntries: weightPerDateEntries,
}
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
