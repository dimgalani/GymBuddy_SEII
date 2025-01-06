// Default notes from different file
const { DEFAULT_NOTES } = require("./defaultnotes")

// used by "GET /user/{usename}/planner/catalog returns correct response and status code"
const latPullDown = {
    name: "Lat Pull Down",
        notes: DEFAULT_NOTES.latPullDown,
        repetitionsPerDateEntries: [8, 10],
        weightPerDateEntries: [40, 40],
}
// used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
const deadlift = {
    name: "Deadlift",
        notes: DEFAULT_NOTES.deadlift,
        repetitionsPerDateEntries: [8, 10],
        weightPerDateEntries: [45, 45],
}
// used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
const benchPress = {
    name: "Bench Press",
    notes: DEFAULT_NOTES.benchPress,
}
module.exports = {latPullDown, deadlift, benchPress}