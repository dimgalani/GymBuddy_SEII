// Default notes from different file
const { DEFAULT_NOTES } = require("./defaultnotes")

// Data for the default user exercise and planner tests
const defaultUser = {
    latPullDown: {
        name: "Lat Pull Down",
            notes: DEFAULT_NOTES.latPullDown,
            repetitionsPerDateEntries: [8, 10],
            weightPerDateEntries: [40, 40],
    },
    deadlift: {
        name: "Deadlift",
            notes: DEFAULT_NOTES.deadlift,
            repetitionsPerDateEntries: [8, 10],
            weightPerDateEntries: [45, 45],
    },
    new: {name: "Deadlift", notes: DEFAULT_NOTES.deadlift,},
    benchPress: {
        name: "Bench Press",
        notes: DEFAULT_NOTES.benchPress,
    },
    planner: {
        currentDate: 1,
        exercisesList: [],
    }
}

module.exports = {defaultUser}