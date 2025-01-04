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

///////////////////////
// GET /reservations //
///////////////////////

test("GET /user/{username}/reservations with Bad Request (no day parameter)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/reservations", {
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 400 responses
    });
    t.is(statusCode, 400);
});

test("GET /user/{usename}/reservations with Bad Request (invalid username)", async (t) => {
    const { body, statusCode } = await t.context.got("user/no_name/reservations", {
        searchParams: {
            day: 3
        },
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 400 responses
    });
    t.is(statusCode, 401);
});

test("GET /user/{usename}/reservations with Bad Request (no existing data)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/reservations", {
        searchParams: {
            day: 30
        },
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 400 responses
    });
    t.is(statusCode, 404);
});

test("GET /user/{usename}/reservations with Correct Request", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/reservations", {
        searchParams: {
            day: 1
        }
    });
    t.is(statusCode, 200);
    t.deepEqual(body, [
        { "date": "2024-11-01", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "time": "08:00", "availability": 50 },
        { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:00", "availability": 50 }
      ]);  // Check with the mock data
});

////////////////////////
// POST /reservations //
////////////////////////

test("POST /user/{username}/reservations with Correct Request (Mock Data)", async (t) => {
    const bodyData = {
        date: "2024-11-01",
        time: "10:00",
        muscleGroup: "lower",
    };
    const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
        json: bodyData
    });
    t.is(statusCode, 201);
 });
 
 test("POST /user/{username}/reservations with Bad Request (Invalid data type)", async (t) => {
    const bodyData = {
        date: 123,
        time: 123,
        muscleGroup: 123,
    };
    const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
        json: bodyData,
        throwHttpErrors: false
    });
    t.is(statusCode, 400);
 });

 test("POST /user/{username}/reservations with Bad Request (Invalid muscle group)", async (t) => {
    const bodyData = {
        date: "2024-11-01",
        time: "10:00",
        muscleGroup: "legs",
    };
    const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
        json: bodyData,
        throwHttpErrors: false
    });
    t.is(statusCode, 400);
 });

test("POST /user/{username}/reservations with Bad Request (Not existing username)", async (t) => {
    const bodyData = {
        date: "2024-11-01",
        time: "10:00",
        muscleGroup: "lower",
    };
    const { body, statusCode } = await t.context.got.post("user/no_name/reservations", {
        json: bodyData,
        throwHttpErrors: false
    });
    t.is(statusCode, 401);
 });

 test("POST /user/{username}/reservations with Bad Request (Existing Reservation)", async (t) => {
    const bodyData = {
        date: "2024-11-01",
        time: "10:00",
        muscleGroup: "upper",
    };
    const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
        json: bodyData,
        throwHttpErrors: false
    });
    t.is(statusCode, 409);
 });


//////////////////////////
// DELETE /reservations //
//////////////////////////

test("DELETE /user/{username}/reservations with Correct Request (Mock Data)", async (t) => {
    const { body, statusCode } = await t.context.got.delete("user/john_doe/reservations", {
        searchParams: {
            day: "2024-11-01",
            time: "08:00"
        }, // Send query parameters
    });
    t.is(statusCode, 202);
});

test("DELETE /user/{username}/reservations with Bad Request (Invalid data types)", async (t) => {
    const { body, statusCode } = await t.context.got.delete("user/john_doe/reservations", {
        searchParams: {
            day: undefined, // Invalid data type
            time: false // Invalid data type
        },
        throwHttpErrors: false // Ensure the test doesn't throw on error response
    });
    t.is(statusCode, 400)
});