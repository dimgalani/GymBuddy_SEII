// Default notes object to reduce complexity
const DEFAULT_NOTES = {
    latPullDown: "Targets the latissimus dorsi muscles, which are the large muscles of the back.",
    deadlift: "It is a compound strength exercise. Targets several muscle groups.",
    benchPress: "Targets the pectoral muscles, triceps, and anterior deltoids.",
};

// Data used in planner catalog tests
const defaultUser = {
    latPullDown: {
        name: "Lat Pull Down",
            notes: DEFAULT_NOTES.latPullDown,
            repetitionsPerDateEntries: [8, 10],
            weightPerDateEntries: [40, 40],
    },
    deadlift: {
        name: "Deadlift",
            notes: DEFAULT_NOTES.deadlift,
            repetitionsPerDateEntries: [8, 10],
            weightPerDateEntries: [45, 45],
    },
    new: {name: "Deadlift", notes: DEFAULT_NOTES.deadlift,},
    benchPress: {
        name: "Bench Press",
        notes: DEFAULT_NOTES.benchPress,
    },
    planner: {
        currentDate: 1,
        exercisesList: [],
    }
}

const johnDoe = {
    latPullDown: {
        name: "Lat Pull Down",
            notes: DEFAULT_NOTES.latPullDown,
            repetitionsPerDateEntries: [10, 12, 14],
            weightPerDateEntries: [40.0, 42.5, 45.0],
    },
    planner: {
        currentDate: 1,
        exercisesList: [
            {
                name: "Romanian Deadlift",
                notes: "Focus on form",
                repetitionsPerDateEntries: [8, 12],
                weightPerDateEntries: [60, 65],
            },
            {
                name: "Hip Thrust",
                notes: "Keep back straight",
                repetitionsPerDateEntries: [10, 15],
                weightPerDateEntries: [80, 85],
            },
        ],
    }
}

const janeSmith = {
    deadlift: {
        name: "deadlift",
            notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
            repetitionsPerDateEntries: [],
            weightPerDateEntries: [],
    }
}

module.exports = { defaultUser, johnDoe, janeSmith };
