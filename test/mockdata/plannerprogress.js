/*
This file gathers all the mock data and is used to import only
one file in the plannerprogress.test.js test file
*/

const {exercise1, exercise2, exercise3} = require('./exercisedetails')

// used by "PUT /user/{username}/planner/progress updates exercise progress entries successfully"
// used by "PUT /user/{username}/planner/progress with invalid username"
// used by "PUT /user/{username}/planner/progress with non-existing exercise name"
benchPress = {
    name: 'Bench_Press',
    day: 8,    
    weight: 70,
    reps: 10
}

// used by "PUT /user/{username}/planner/progress with bad request"
newProgress = {
    name: "Bench Press",
    weightPerDateEntries: "1234",
    repetitionsPerDateEntries: 10
}

// Gather exercises
const exercises = [exercise1, exercise2, exercise3]
module.exports = {exercises, benchPress, newProgress}