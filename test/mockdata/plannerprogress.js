/*
This file gathers all the mock data and is used to import only
one file in the plannerprogress.test.js test file
*/

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

// weight perfomed, index indicates the day
const weightPerDateEntries = [
    [5, 6, 6, 8, 8, 5, 6, 6, 8, 8],
    [20, 25, 25, 25 ,30, 20, 25, 25, 25, 30],
    [30, 35, 35, 40, 45, 30, 35, 35, 40, 45]
]
// repetitions perfomed, index indicates the day
const repetitionsPerDateEntries = [
    [10, 10, 15, 10, 10],
    [15, 15, 15, 20, 15],
    [5, 5, 5, 5, 8]
]

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
// Gather exercises
const exercises = [exercise1, exercise2, exercise3]
module.exports = {exercises, benchPress, newProgress}