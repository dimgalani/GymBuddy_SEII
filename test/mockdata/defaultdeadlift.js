/*
This files contains the mock data regarding the planner catalog tests
It is being imported in plannercatalog.js
Tests are located in plannercatalog.test.js
*/

// Default notes from different file
const { DEFAULT_NOTES } = require("./defaultplanner")

// used by "POST /user/{username}/planner/catalog with Bad Request - Already existing exercise"
const repetitionsPerDateEntries = [8,10]
var weightPerDateEntries = [45,45] // update value for new data format
const deadlift = {
    name: "Deadlift",
    notes: DEFAULT_NOTES.deadlift,
    repetitionsPerDateEntries: repetitionsPerDateEntries,
    weightPerDateEntries: weightPerDateEntries,
}

module.exports = {deadlift}