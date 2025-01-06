// used by "GET /user/{username}/planner/progress returns exercise details successfully"
exercices = [
    { "notes" : "note1", "name" : "exercise_1", "weightPerDateEntries" : [ 5, 6, 6, 8, 8, 5, 6, 6, 8, 8], "repetitionsPerDateEntries" : [ 10, 10, 15, 10, 10 ] },
    { "notes" : "note2", "name" : "exercise_2", "weightPerDateEntries" : [ 20, 25, 25, 25 ,30, 20, 25, 25, 25 ,30], "repetitionsPerDateEntries" : [ 15, 15, 15, 20, 15 ]  },
    { "notes" : "note3", "name" : "exercise_3", "weightPerDateEntries" : [ 30, 35, 35, 40, 45, 30, 35, 35, 40, 45], "repetitionsPerDateEntries" : [ 5, 5, 5, 5 ,8 ] }
]

// used by "PUT /user/{username}/planner/progress updates exercise progress entries successfully"
// used by "PUT /user/{username}/planner/progress with invalid username"
// used by "PUT /user/{username}/planner/progress with non-existing exercise name"
benchPress = {
    name: 'Bench_Press',
    day: 8,    
    weight: 70,
    reps: 10
}

newProgress = {
    name: "Bench Press",
    weightPerDateEntries: "1234",
    repetitionsPerDateEntries: 10
}
module.exports = {exercices, benchPress, newProgress}