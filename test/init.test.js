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
    const { body, statusCode } = await t.context.got("user/john_doe/myreservations",{
    });

    t.is(statusCode, 200);

    // t.true(Array.isArray(body)); // Response is an array
    // t.true(body.length <= 3);    // Response contains at most 3 reservations

    // // Validate the structure of each reservation object
    // body.forEach((reservation) => {
    //     t.truthy(reservation.date);
    //     t.true(Array.isArray(reservation.reservationsPerMuscleGroup));
    //     t.is(typeof reservation.muscleGroup, "string");
    //     t.is(typeof reservation.time, "string");
    //     t.true(reservation.availability === 0 || reservation.availability === 1);
    });

    t.deepEqual(body, [
        { "date": "2024-11-01", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "muscleGroup" : "muscleGroup", "time": "08:00 AM", "availability": 0 },
        { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "muscleGroup" : "muscleGroup", "time": "10:00 AM", "availability": 1 },
        { "date": "2024-11-02", "reservationsPerMuscleGroup": [10, 11, 12, 13, 14], "muscleGroup" : "muscleGroup", "time": "09:00 AM", "availability": 1 }
          
    ]);
});

test("GET /user/{username}/myreservations returns empty array if no reservations", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/myreservations");
    t.is(statusCode, 200);
    t.deepEqual(body, []); // Empty array
});

// planner/progress GET

test("GET /user/{usename}/planner/progress with Bad Request Format", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/progress", {
		throwHttpErrors: false,
        searchParams: {
            day: "invalid_day" // Simulating an invalid query parameter
        }
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
        { "notes" : "note1", "name" : "exercise_1", "weightPerDateEntries" : [ 5, 6, 6, 8, 8], "repetitionsPerDateEntries" : [ 10, 10, 15, 10, 10 ] },
        { "notes" : "note2", "name" : "exercise_2", "weightPerDateEntries" : [ 20, 25, 25, 25 ,30], "repetitionsPerDateEntries" : [ 15, 15, 15, 20, 15 ]  },
        { "notes" : "note3", "name" : "exercise_3", "weightPerDateEntries" : [ 30, 35, 35, 40, 45], "repetitionsPerDateEntries" : [ 5, 5, 5, 5 ,8 ] }
    ]);
});
