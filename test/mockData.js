const planner_catalog = {
    latPullDown: {
        default: {
            name: "Lat Pull Down",
            notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back.",
            repetitionsPerDateEntries: [8, 10,],
            weightPerDateEntries: [40, 40,],
        },
        john_doe: {
            name: "Lat Pull Down",
            notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back.",
            weightPerDateEntries: [40.0, 42.5, 45.0],
            repetitionsPerDateEntries: [10, 12, 14],
        }
    },
    deadlift: {
        default: {
            name: "Deadlift",
            notes: "It is a compound strength exercise. Targets several muscle groups.",
            repetitionsPerDateEntries: [8, 10,],
            weightPerDateEntries: [45, 45,],
        },
        jane_smith: {
            name: "deadlift",
            notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
            weightPerDateEntries: [],
            repetitionsPerDateEntries: [],
        },
        new: {name: "Deadlift", notes: "It is a compound strength exercise. Targets several muscle groups.",}
    },
    benchpress: {name: "Bench Press",notes: "Targets the pectoral muscles, triceps, and anterior deltoids. Setup: Lie on a flat bench with your feet flat on the floor. Grasp the barbell with your hands slightly wider than shoulder-width apart. Lower the bar to your chest, then press it back up to the starting position.",},
    john_doe: {
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
    default: {currentDate: 1,exercisesList: [],	}
}

module.exports = {planner_catalog };