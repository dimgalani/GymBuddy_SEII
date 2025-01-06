// Default notes from different file
const { DEFAULT_NOTES } = require("./defaultnotes")

// Data for the default user exercise and planner tests
const defaultUser = {
    // used by "GET /user/{usename}/planner/catalog returns correct response and status code"
    latPullDown: {
        name: "Lat Pull Down",
            notes: DEFAULT_NOTES.latPullDown,
            repetitionsPerDateEntries: [8, 10],
            weightPerDateEntries: [40, 40],
    },
    // used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
    deadlift: {
        name: "Deadlift",
            notes: DEFAULT_NOTES.deadlift,
            repetitionsPerDateEntries: [8, 10],
            weightPerDateEntries: [45, 45],
    },
    // used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
    new: {name: "Deadlift", notes: DEFAULT_NOTES.deadlift,},
    benchPress: {
        name: "Bench Press",
        notes: DEFAULT_NOTES.benchPress,
    },
    // used by "GET /user/{username}/planner with Default User"
    planner: {
        currentDate: 1,
        exercisesList: [],
    }
}

module.exports = {defaultUser}