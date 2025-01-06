/*
This files contains the mock data regarding the planner catalog tests
It is being imported in plannercatalog.js
Tests are located in plannercatalog.test.js
*/

// Default notes from different file
const { DEFAULT_NOTES } = require("./defaultnotes")

// used by "GET /user/{usename}/planner/catalog returns correct response and status code"
const repetitionsPerDateEntries = [8,10]
var weightPerDateEntries = [40,40]
const latPullDown = {
    name: "Lat Pull Down",
        notes: DEFAULT_NOTES.latPullDown,
        repetitionsPerDateEntries: repetitionsPerDateEntries,
        weightPerDateEntries: weightPerDateEntries,
}
// used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
var weightPerDateEntries = [45,45]
const deadlift = {
    name: "Deadlift",
    notes: DEFAULT_NOTES.deadlift,
    repetitionsPerDateEntries: repetitionsPerDateEntries,
    weightPerDateEntries: weightPerDateEntries,
}
// used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
const benchPress = {
    name: "Bench Press",
    notes: DEFAULT_NOTES.benchPress,
}
module.exports = {latPullDown, deadlift, benchPress}