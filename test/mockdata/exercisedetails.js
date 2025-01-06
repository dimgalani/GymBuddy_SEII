/*
This file contains the exercise details used 
for the plannerprogress.test.js test file
it is divided into three parts for maintainability purposes
*/

const {weightPerDateEntries, repetitionsPerDateEntries} = require('./weightreps')
// used by "GET /user/{username}/planner/progress returns exercise details successfully"

// first mock exercise
const exercise1 = {
    notes : "note1",
    name : "exercise_1",
    weightPerDateEntries : weightPerDateEntries[0],
    repetitionsPerDateEntries : repetitionsPerDateEntries[0]
}

// second mock exercise
const exercise2 = {
    notes : "note2",
    name : "exercise_2",
    weightPerDateEntries : weightPerDateEntries[1],
    repetitionsPerDateEntries : repetitionsPerDateEntries[1]
}

// third mock exercise
const exercise3 = {
    notes : "note3",
    name : "exercise_3",
    weightPerDateEntries : weightPerDateEntries[2],
    repetitionsPerDateEntries : repetitionsPerDateEntries[2]
}

module.exports = {exercise1, exercise2, exercise3}