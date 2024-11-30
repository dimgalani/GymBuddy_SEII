const http = require('node:http');
const test = require('ava');
const got = require('got');

const app = require('../index');

test.before(async (t) => { 
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

// /myreservations GET

test("GET /user/{username}/myreservations with Bad Request Format", async (t) => {
    const { statusCode, body } = await t.context.got("user/default/myreservations", {
        throwHttpErrors: false,
        searchParams: {
            day: "invalid_day" // Simulating an invalid query parameter
        }
    });

    t.is(statusCode, 400);

});

test("GET /user/{username}/myreservations returns up to 3 upcoming reservations", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/myreservations");

    t.is(statusCode, 200);

    t.true(Array.isArray(body)); // Response is an array
    t.true(body.length <= 3);    // Response contains at most 3 reservations

    // Validate the structure of each reservation object
    // body.forEach((reservation) => {
    //     t.truthy(reservation.date);
    //     t.true(Array.isArray(reservation.reservationsPerMuscleGroup));
    //     t.is(typeof reservation.muscleGroup, "string");
    //     t.is(typeof reservation.time, "string");
    //     t.true(reservation.availability === 0 || reservation.availability === 1);
    // });

    t.deepEqual(body, [
            { "date": "2024-11-27", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "muscleGroup": "Back", "time": "08:00 AM", "availability": 0 },
            { "date": "2024-11-28", "reservationsPerMuscleGroup": [0, 1, 0, 2, 0], "muscleGroup": "Chest", "time": "09:00 AM", "availability": 1 },
            { "date": "2024-11-29", "reservationsPerMuscleGroup": [2, 0, 1, 0, 3], "muscleGroup": "Legs", "time": "07:00 AM", "availability": 1 }
          
    ]);
});

test("GET /user/{username}/myreservations returns empty array if no reservations", async (t) => {
    const { body, statusCode } = await t.context.got("user/empty_user/myreservations");
    t.is(statusCode, 200);
    t.deepEqual(body, []); // Empty array
});

// planner/progress GET

test("GET /user/{usename}/planner/progress with Bad Request Format", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/progress", {
		throwHttpErrors: false
	});
	t.is(statusCode, 400);
});

test("GET /user/{username}/planner/progress returns exercise details successfully", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/planner/progress");

    t.is(statusCode, 200);
    
    t.true(Array.isArray(body.exercises)); // response contains an "exercises" array

    // Check that each exercise has the correct structure
    // body.exercises.forEach((exercise) => {
    //     // Validate each field in the exercise object
    //     t.is(typeof exercise.name, "string");
    //     t.is(typeof exercise.notes, "string");
    //     t.true(Array.isArray(exercise.weightPerDateEntries));
    //     t.true(exercise.weightPerDateEntries.every(weight => typeof weight === "number"));
    //     t.true(Array.isArray(exercise.repetitionsPerDateEntries));
    //     t.true(exercise.repetitionsPerDateEntries.every(rep => typeof rep === "number"));
    // });

    t.deepEqual(body.exercises, [
        { name: "Exercise 1", notes: "notes", weightPerDateEntries: [6.0274563, 6.0274563], repetitionsPerDateEntries: [5, 10] },
        { name: "Exercise 2", notes: "notes", weightPerDateEntries: [6.0274563, 6.0274563], repetitionsPerDateEntries: [12, 8] }
    ]);
});
