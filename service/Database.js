// Purpose: Mock data for the database
const usernames = ["john_doe", "alice_wonder", "jane_smith", "default"];

// Mock dataset: User settings
const UserSettings = [
  {
    username: "john_doe", // The username of the user
    settings: {
      bodyweight: null, // The bodyweight of the user
      gender: "male", // Gender of the user
      goals: [true, false, true, true], // The goals of the user [strength, reps increase, workout consistency, bodyweight]
      goalConsistencyNum: 5, // The goal consistency of the user
      goalBodyWeightNum: 90.0, // The goal bodyweight of the user
    },
  },
  {
    username: "jane_smith",
    settings: {
      bodyweight: 65.0,
      gender: "female",
      goals: [false, true, true, true],
      goalConsistencyNum: 7,
      goalBodyWeightNum: 55.00,
    },
  },
  {
    username: "default",
    settings: {
      bodyweight: 75.00,
      gender: "male",
      goals: [false, false, false, ],
      goalConsistencyNum: 6,
      goalBodyWeightNum: 80.0,
    },
  },
  {
    username: "nathaniel_brooks",
    settings: {
      bodyweight: 75.00,
      gender: "male",
      goals: [false, false, false, true],
      goalConsistencyNum: 6,
      goalBodyWeightNum: null,
    },
  },
  {
    username: "adrian_carter",
    settings: {
      bodyweight: 75.00,
      gender: "male",
      goals: [false, false, false, true],
      goalConsistencyNum: 6,
      goalBodyWeightNum: 90.00,
    },
  },
];

// Mock dataset: Exercise catalog
const ExerciseCatalog = [
  {
    name: "Lat Pull Down",
    notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back.",
    weightPerDateEntries: [40, 40], // The weight per date entries
    repetitionsPerDateEntries: [8, 10], // The repetitions per date entries
  },
  {
    name: "Deadlift",
    notes: "It is a compound strength exercise. Targets several muscle groups.",
    weightPerDateEntries: [45, 45],
    repetitionsPerDateEntries: [8, 10],
  },
];

// Mock dataset: Available reservations
const availableReservations = {
  1: [
    // Reservation for the first day
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "time": "08:00", "availability": 50 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:00", "availability": 50 }
  ],
  2: [
    { "date": "2024-11-02", "reservationsPerMuscleGroup": [10, 11, 12, 13, 14], "time": "09:00", "availability": 50 },
    { "date": "2024-11-02", "reservationsPerMuscleGroup": [20, 19, 18, 17, 16], "time": "11:00", "availability": 50 }
  ],
  3: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "08:30", "availability": 50 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:30", "availability": 50 }
  ],
  4: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "09:30", "availability": 50 },
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "11:30", "availability": 50 }
  ],
  5: [
    { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "12:00", "availability": 50 }
  ]
};

// Mock dataset: reservations per user
const userReservations = {
  john_doe: [
    { date: "2024-11-01", muscleGroup: "upper", time: "08:00" }, // Reservation for John Doe
    { date: "2024-11-02", muscleGroup: "lower", time: "10:00" },
    { date: "2024-11-03", muscleGroup: "core", time: "12:00" },
    { date: "2024-11-04", muscleGroup: "cardio", time: "06:00" }
  ],
  alice_wonder: [
    { date: "2024-11-01", muscleGroup: "cardio", time: "07:00" },
    { date: "2024-11-02", muscleGroup: "core", time: "09:30" },
    { date: "2024-11-03", muscleGroup: "upper", time: "11:00" },
    { date: "2024-11-04", muscleGroup: "lower", time: "16:30" }
  ],
  jane_smith: [
    { date: "2024-11-01", muscleGroup: "lower", time: "08:30" },
    { date: "2024-11-02", muscleGroup: "cardio", time: "11:00" },
    { date: "2024-11-03", muscleGroup: "core", time: "13:30" },
    { date: "2024-11-04", muscleGroup: "upper", time: "17:00" }
  ],
  default: []
};

// Mock dataset: user goals for progress
const userProgress = {
  john_doe: {
    1: [true, true, false, true, true],
    2: [true, true, true, true, true],
    3: [false, false, false, false, false],
  },
  jane_smith: {
    1: [true, false, true, false, true],
    2: [true, true, true, true, true],
    3: [true, false, false, false, true],
  },
  alice_wonder: {
    1: [false, false, false, false, false],
    2: [true, true, true, false, true],
    3: [true, true, true, true, true],
  },
  default: {
    1: [false, false, false, false, false],
  },
};

// Mock dataset: user planner
const usersPlanner = [
  {
    username: "john_doe",
    exercise: {
       notes: "note1",
       name: "Bench_Press",
       weightPerDateEntries: [70, 80, 80, 80, 85, 90, null, null, null, null],
       repetitionsPerDateEntries: [10, 10, 10, 10, 10, null, null, null, null, null]
     }
  },
    {
      username: "jane_smith",
      exercise: {
       notes: "note2",
       name: "Squat",
       weightPerDateEntries: [100, 110, 110, 110, 110, 110, null, null, null, null],
       repetitionsPerDateEntries: [5, 5, 5, 5, 5, 5, null, null, null, null]
     }
    }
];

const exerciseData = {
  john_doe: {
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
  },
  alice_wonders: {
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
  },
  jane_smith: {
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
  },
  default: {}, // Default user has no exercise data
};

const dayofPlannerData = {
  john_doe: {
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
  },
  jane_smith: {
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
  },
  default: {
    1: {
      currentDate: 1,
      exercisesList: [], // Empty exercisesList for the default user
    },
  },
};

// Export the mock data
module.exports = {
    usernames,
    UserSettings,
    ExerciseCatalog,
    availableReservations,
    userReservations,
    userProgress,
    usersPlanner,
    exerciseData,
    dayofPlannerData
    };