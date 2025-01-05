const http = require('node:http');
const test = require('ava');
const got = require('got');

const { app, startServer } = require('../test_setup');  // Import both app and startServer

test.before(async (t) => {
    t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();

    t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after((t) => {
    t.context.server.close();
});

/**
 * This file contains tests for the Planner Catalog API endpoints. It verifies the functionality of retrieving and managing exercise data,
 * including getting the entire catalog, adding new exercises, and retrieving individual exercise details. The tests also cover various
 * edge cases, such as invalid requests or duplicate data.
 */

// GET /planner //
test("GET /user/{username}/planner with Bad Request (no day parameter)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner", {
		throwHttpErrors: false,
	});
	t.is(statusCode, 400);   
});


test("GET /user/{username}/planner with Bad Request or Not Found", async (t) => {
    //try {
        const { body, statusCode } = await t.context.got("user/john_doe/planner", {
            searchParams: {
                day: 5,
            },
            throwHttpErrors: false,
        });
		t.is(statusCode, 404);
});


test("GET /user/{usename}/planner with Bad Request (wrong day datatype)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner", {
		searchParams: {
			day: "invalid_day"
		},
		throwHttpErrors: false
	});
	t.is(statusCode, 400);
});


test("GET /user/{usename}/planner with Correct Request", async (t) => {
		const { body, statusCode } = await t.context.got("user/john_doe/planner", {
			searchParams: {
				day: 1
			},
			throwHttpErrors: false
		});
		t.is(statusCode, 200);
		t.deepEqual(body, {
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
		});
});

test("GET /user/{username}/planner with Default User", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner", {
		searchParams: {
		day: 1,
		},
	});
	
	t.is(statusCode, 200);
	t.deepEqual(body, {
		currentDate: 1,
		exercisesList: [],
	});
});


 // GET /planner/catalog //
test("GET /user/{usename}/planner/catalog returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/catalog");
	//t.is(body.message, "Exercises Catalogue");
	t.is(statusCode, 200);
	// Verify the body structure
	t.true(Array.isArray(body.exercises), "Exercises should be an array");
	t.is(body.exercises[0].name, "Lat Pull Down", "The first exercise name should be 'Lat Pull Down'");
	t.is(body.exercises[0].notes, "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-do...", "The first exercise notes should be 'Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-do...'");
});

test("GET /user/{usename}/planner/catalog Bad request - invalid username", async (t) => {
	const { body, statusCode } = await t.context.got("user/invalid-user/planner/catalog",{
		throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
	});
	//t.is(body.message, "Exercises Catalogue");
	t.is(statusCode, 401);
});

 // POST /user/{username}/planner/catalog //
test("POST /user/{username}/planner/catalog with Correct Request (Mock Data)", async (t) => {
	const newExercise = {
		name: "Bench Press",
		notes: "Targets the pectoral muscles, triceps, and anterior deltoids. Setup: Lie on a flat bench with your feet flat on the floor. Grasp the barbell with your hands slightly wider than shoulder-width apart. Lower the bar to your chest, then press it back up to the starting position.",
	};
	const { body, statusCode } = await t.context.got.post("user/default/planner/catalog", {
		json: newExercise,
		responseType: "json",
	});
	t.is(statusCode, 201);
	t.deepEqual(body.exercise, newExercise);
});

test("POST /user/{username}/planner/catalog with Bad Request - Already existing exercise", async (t) => {
	const newExercise = {
		name: "Lat Pull Down",
		notes: "blah blah blah",
	};
	const { body, statusCode } = await t.context.got.post("user/default/planner/catalog", {
		json: newExercise,
		responseType: "json",
		throwHttpErrors: false
	});
	t.is(statusCode, 409);
	t.deepEqual(body.exercise.name, newExercise.name);
});

// GET /catalog/{exercise-name} //
test("GET /user/{usename}/planner/catalog/{exercise-name} with Bad Request (invalid exercise_name parameter)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/catalog/no_exercise", {
		throwHttpErrors: false 
	});

	t.is(statusCode, 404);
});


test("GET /user/{username}/planner/catalog/{exercise-name} with Bad Request (invalid username)", async (t) => {
	const { body, statusCode } = await t.context.got("user/invalid_user/planner/catalog/lat-pull-down", {
	  throwHttpErrors: false
	});

	t.is(statusCode, 401);
  
});
  
test("GET /user/{usename}/planner/catalog/{exercise_name} with Correct Request", async (t) => {
	const { body, statusCode } = await t.context.got("user/john_doe/planner/catalog/lat-pull-down", {
		throwHttpErrors: false
	});

	t.is(statusCode, 200);

	t.deepEqual(body, {
		name: "Lat Pull Down",
	 	notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-down machine with your knees securely under the pads. Adjust the thigh pads to fit comfortably against your thighs. Grasp the wide bar with an overhand grip, hands slightly wider than shoulder-width apart.",
		weightPerDateEntries: [40.0, 42.5, 45.0],
		repetitionsPerDateEntries: [10, 12, 14],
	  });
});

test("GET /user/{usename}/planner/catalog/{exercise_name} with Correct Request and no exercise progress", async (t) => {
	const { body, statusCode } = await t.context.got("user/jane_smith/planner/catalog/deadlift", {
		throwHttpErrors: false
	});
	t.is(statusCode, 200);
	t.deepEqual(body, {
		name: "deadlift",
		notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
		weightPerDateEntries: [],
		repetitionsPerDateEntries: [],
	});
});
