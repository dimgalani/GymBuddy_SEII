const usernames = ["john_doe", "alice_wonder", "jane_smith", "default"];

const UserSettings = [
  {
    username: "john_doe",
    settings: {
      bodyweight: null,
      gender: "male",
      goals: [true, false, true, true],
      goalConsistencyNum: 5,
      goalBodyWeightNum: 90.0,
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

const ExerciseCatalog = [
  {
    name: "Lat Pull Down",
    notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-do...",
    weightPerDateEntries: [40, 40],
    repetitionsPerDateEntries: [8, 10],
  },
  {
    name: "Deadlift",
    notes: "It is a compound strength exercise. Targets several muscle groups. Setup: Stand with your feet hip-widt...",
    weightPerDateEntries: [45, 45],
    repetitionsPerDateEntries: [8, 10],
  },
];
// Mock dataset: Available reservations
const availableReservations = {
  1: [
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
    { date: "2024-11-01", muscleGroup: "upper", time: "08:00" },
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

module.exports = {
    usernames,
    UserSettings,
    ExerciseCatalog,
    availableReservations,
    userReservations,
    userProgress,
    usersPlanner
    };