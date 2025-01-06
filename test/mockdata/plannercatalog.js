/*
This file gathers all the mock data and is used to import only
one file in the plannercatalog.test.js test file
*/

// Default notes from different file
const { newExercise, planner, benchPress } = require("./defaultplanner")
const { johnDoeLatPulldown, janeSmithDeadlift} = require("./userexercises")
const { johnDoeDeadlift, johnDoeHipThrust} = require("./userplanner")
const { deadlift} = require("./defaultdeadlift")
const { latPullDown} = require("./defaultlatpulldown")

// Data used for default user exercise and planner tests
const defaultUser = {latPullDown, deadlift, benchPress, newExercise, planner}

module.exports = { defaultUser, johnDoeLatPulldown, janeSmithDeadlift, johnDoeDeadlift, johnDoeHipThrust};
