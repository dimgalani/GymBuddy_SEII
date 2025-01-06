/*
This file contains the exercise details used 
for the plannerprogress.test.js test file
it is divided into three parts for maintainability purposes
*/
// used by "GET /user/{username}/planner/progress returns exercise details successfully"

// first mock exercise
var weightPerDateEntries = [5, 6, 6, 8, 8, 5, 6, 6, 8, 8]
var repetitionsPerDateEntries = [ 10, 10, 15, 10, 10 ]
const exercise1 = {
    notes : "note1",
    name : "exercise_1",
    weightPerDateEntries : weightPerDateEntries,
    repetitionsPerDateEntries : repetitionsPerDateEntries
}

// second mock exercise
var weightPerDateEntries = [ 20, 25, 25, 25 ,30, 20, 25, 25, 25 ,30]
var repetitionsPerDateEntries = [ 15, 15, 15, 20, 15 ]
const exercise2 = {
    notes : "note2",
    name : "exercise_2",
    weightPerDateEntries : weightPerDateEntries,
    repetitionsPerDateEntries : repetitionsPerDateEntries
}

// third mock exercise
var weightPerDateEntries = [ 30, 35, 35, 40, 45, 30, 35, 35, 40, 45]
var repetitionsPerDateEntries = [ 5, 5, 5, 5 ,8 ]
const exercise3 = {
    notes : "note3",
    name : "exercise_3",
    weightPerDateEntries : weightPerDateEntries,
    repetitionsPerDateEntries : repetitionsPerDateEntries
}

module.exports = {exercise1, exercise2, exercise3}