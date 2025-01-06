const test = require('ava');
const { app, setupTestContext, teardownTestContext } = require('../test_setup');
const { reservation1, reservation2, bodyData, bodyDataInvalidTypes, bodyDataInvalidGroup, bodyDataExisting, query1, query2, upcomingReservations } = require('./mockdata/reservation');

test.before(async (t) => {
    await setupTestContext(t, app);
});

test.after(teardownTestContext);

/**
 * This file contains tests for the reservation-related endpoints in the GymBuddy AUTH API.
 * It covers GET, POST, and DELETE operations for reservations, as well as validations for correct
 * and incorrect inputs.
 */

// GET /reservations //
test("GET /user/{username}/reservations with Bad Request (no day parameter)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/reservations", {
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 400 responses
    });
    t.is(statusCode, 400);
});

test("GET /user/{usename}/reservations with Bad Request (invalid username)", async (t) => {
    const { body, statusCode } = await t.context.got("user/no_name/reservations", {
        searchParams: {day: 3},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 400 responses
    });
    t.is(statusCode, 401);
});

test("GET /user/{usename}/reservations with Bad Request (no existing data)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/reservations", {
        searchParams: {day: 30},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 400 responses
    });
    t.is(statusCode, 404);
});

test("GET /user/{usename}/reservations with Correct Request", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/reservations", {
        searchParams: {day: 1}
    });
    t.is(statusCode, 200);
    t.deepEqual(body, [reservation1, reservation2]);  // Check with the mock data
});


// POST /reservations //
test("POST /user/{username}/reservations with Correct Request (Mock Data)", async (t) => {
    const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
        json: bodyData
    });
    t.is(statusCode, 201);
 });
 
 test("POST /user/{username}/reservations with Bad Request (Invalid data type)", async (t) => {
    const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
        json: bodyDataInvalidTypes,
        throwHttpErrors: false
    });
    t.is(statusCode, 400);
 });

 test("POST /user/{username}/reservations with Bad Request (Invalid muscle group)", async (t) => {
    const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
        json: bodyDataInvalidGroup,
        throwHttpErrors: false
    });
    t.is(statusCode, 400);
 });

test("POST /user/{username}/reservations with Bad Request (Not existing username)", async (t) => {
    const { body, statusCode } = await t.context.got.post("user/no_name/reservations", {
        json: bodyData,
        throwHttpErrors: false
    });
    t.is(statusCode, 401);
 });

 test("POST /user/{username}/reservations with Bad Request (Existing Reservation)", async (t) => {
    const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
        json: bodyDataExisting,
        throwHttpErrors: false
    });
    t.is(statusCode, 409);
 });


// DELETE /reservations //
test("DELETE /user/{username}/reservations with Correct Request (Mock Data)", async (t) => {
    const { body, statusCode } = await t.context.got.delete("user/john_doe/reservations", {
        searchParams: query1, // Send query parameters
    });
    t.is(statusCode, 202);
});

test("DELETE /user/{username}/reservations with Bad Request (Invalid data types)", async (t) => {
    const { body, statusCode } = await t.context.got.delete("user/john_doe/reservations", {
        searchParams: query2,
        throwHttpErrors: false // Ensure the test doesn't throw on error response
    });
    t.is(statusCode, 400)
});

 // GET /myreservations  //
test("GET /user/{username}/myreservations with Bad Request Format", async (t) => {
    const { statusCode, body } = await t.context.got("user/default/myreservations", {
        throwHttpErrors: false,
        searchParams: {day: "invalid_day"}
    });

    t.is(statusCode, 400);
});

test("GET /user/{username}/myreservations returns up to 3 upcoming reservations", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/myreservations",{
    });

    t.is(statusCode, 200);

    t.deepEqual(body, upcomingReservations);
});

test("GET /user/{username}/myreservations returns empty array if no reservations", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/myreservations");
    t.is(statusCode, 200);
    t.deepEqual(body, []); // Empty array
});

test("GET /user/{username}/myreservations with invalid username", async (t) => {
    const { statusCode, body } = await t.context.got("user/no_name/myreservations", {
        throwHttpErrors: false
    });

    t.is(statusCode, 401);

});
