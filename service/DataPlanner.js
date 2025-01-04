// Description: This file contains the data for the planner and exercises.
const exerciseData = getExerciseData();
const dayofPlannerData = getDayofPlannerData();
const usersPlanner = getUsersPlanner();

function getExerciseData() {
    return {
        john_doe: getJohnDoeExercises(),
        alice_wonders: getAliceWondersExercises(),
        jane_smith: getJaneSmithExercises(),
        default: {}, // Default user has no exercise data
    };
}

function getJohnDoeExercises() {
    return {
        "lat-pull-down": {
            name: "Lat Pull Down",
            notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back.",
            weightPerDateEntries: [40.0, 42.5, 45.0],
            repetitionsPerDateEntries: [10, 12, 14],
        },
        "hip-thrust": {
            name: "Hip Thrust",
            notes: "Engage glutes throughout the lift. Focus on keeping your upper back against the bench and avoid arching your lower back.",
            weightPerDateEntries: [80, 85, 90],
            repetitionsPerDateEntries: [10, 12, 10],
        },
    };
}

function getAliceWondersExercises() {
    return {
        "bulgarian-split-squat": {
            name: "Bulgarian Split Squat",
            notes: "Targets quads, glutes, and hamstrings. Place your rear foot on an elevated surface and keep your front knee tracking over your toes.",
            weightPerDateEntries: [45, 50, 55],
            repetitionsPerDateEntries: [10, 12, 10],
        },
        "deadlift": {
            name: "deadlift",
            notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
            weightPerDateEntries: [100, 110, 120],
            repetitionsPerDateEntries: [5, 6, 5],
        },
    };
}

function getJaneSmithExercises() {
    return {
        "bulgarian-split-squat": {
            name: "Bulgarian Split Squat",
            notes: "Targets quads, glutes, and hamstrings. Place your rear foot on an elevated surface and keep your front knee tracking over your toes.",
            weightPerDateEntries: [40, 45, 50],
            repetitionsPerDateEntries: [12, 12, 12],
        },
        "smith-machine-squats": {
            name: "Smith Machine Squats",
            notes: "Keep the bar positioned over the midfoot and engage your core for stability during the descent and ascent.",
            weightPerDateEntries: [100, 110, 115],
            repetitionsPerDateEntries: [8, 8, 8],
        },
        "deadlift": {
            name: "deadlift",
            notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
            weightPerDateEntries: [],
            repetitionsPerDateEntries: [],
        }
    };
}

function getDayofPlannerData() {
    return {
        john_doe: getJohnDoePlanner(),
        jane_smith: getJaneSmithPlanner(),
        default: getDefaultPlanner(),
    };
}

function getJohnDoePlanner() {
    return {
        1: {
            currentDate: 1,
            exercisesList: [
                {
                    name: "Romanian Deadlift",
                    notes: "Focus on form",
                    weightPerDateEntries: [60, 65],
                    repetitionsPerDateEntries: [8, 12],
                },
                {
                    name: "Hip Thrust",
                    notes: "Keep back straight",
                    weightPerDateEntries: [80, 85],
                    repetitionsPerDateEntries: [10, 15],
                },
            ],
        },
    };
}

function getJaneSmithPlanner() {
    return {
        2: {
            currentDate: 2,
            exercisesList: [
                {
                    name: "Bulgarian Split Squat",
                    notes: "Increase weight next time",
                    weightPerDateEntries: [40, 45],
                    repetitionsPerDateEntries: [12, 12],
                },
                {
                    name: "Smith Machine Squats",
                    notes: "Slow descent",
                    weightPerDateEntries: [100, 110],
                    repetitionsPerDateEntries: [8, 8],
                },
            ],
        },
    };
}

function getDefaultPlanner() {
    return {
        1: {
            currentDate: 1,
            exercisesList: [], // Empty exercisesList for the default user
        },
    };
}

function getUsersPlanner() {
    return [
        getJohnDoeUserPlanner(),
        getJaneSmithUserPlanner(),
    ];
}

function getJohnDoeUserPlanner() {
    return {
        username: "john_doe",
        exercise: {
            notes: "note1",
            name: "Bench_Press",
            weightPerDateEntries: [70, 80, 80, 80, 85, 90, null, null, null, null],
            repetitionsPerDateEntries: [10, 10, 10, 10, 10, null, null, null, null, null]
        }
    };
}

function getJaneSmithUserPlanner() {
    return {
        username: "jane_smith",
        exercise: {
            notes: "note2",
            name: "Squat",
            weightPerDateEntries: [100, 110, 110, 110, 110, 110, null, null, null, null],
            repetitionsPerDateEntries: [5, 5, 5, 5, 5, 5, null, null, null, null]
        }
    };
}

module.exports = {
    exerciseData,
    dayofPlannerData,
    usersPlanner
    };