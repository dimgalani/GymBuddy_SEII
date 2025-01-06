// used by "GET /user/{username}/settings with Correct Request"
const correctMale = {
    gender: "male",
    goalConsistencyNum: 4,
    goalBodyWeightNum: 75,
    bodyweight: 80.5,
    goals: [true, false, true],
}

// used by "PUT /user/{username}/settings updates the bodyweight and other settings"
// used by "PUT /user/{username}/settings with Bad Request ( username doesn't exists )"
const correctFemale = {
    bodyweight: 64.0,
    gender: "female",
    goals: [false, true, true, true],
    goalConsistencyNum: 6,
    goalBodyWeightNum: 55.00,
}

// used by "PUT /user/{username}/settings with Bad Request (wrong datatypes)"
wrongTypes = {
    bodyweight: "hello", 
    gender: "2744",
    goals: [false, true, true, true],
    goalConsistencyNum: 6,
    goalBodyWeightNum: 55.00,
}
module.exports = {correctMale, correctFemale, wrongTypes}