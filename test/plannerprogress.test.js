const test = require('ava');
const { app, setupTestContext, teardownTestContext } = require('../test_setup');
const {exercices, benchPress, newProgress } = require('./mockdata/plannerprogress');

test.before(async (t) => {
    await setupTestContext(t, app);
});

test.after(teardownTestContext);

/**
 * This file contains tests for the Planner Progress API endpoints.
 * It ensures the correctness of functionalities related to retrieving, updating, 
 * and managing exercise progress data, as well as validating user-specific 
 * planner progress and goals. The tests include scenarios for both valid 
 * and invalid requests, covering edge cases like missing parameters, incorrect 
 * data types, and non-existent users or exercises.
 */

 // GET planner/progress //
test("GET /user/{usename}/planner/progress with Bad Request Format", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/progress", {
		throwHttpErrors: false,
        searchParams: {day: "invalid_day"}	// Simulating an invalid query parameter
	});
	t.is(statusCode, 400);
});

test("DELETE /user/{username}/reservations with Unauthorized Request (Non-existent username)", async (t) => {
	const { body, statusCode } = await t.context.got.delete("user/non_existent_user/reservations", {
		searchParams: {day: "2024-11-01", time: "08:00"},
		throwHttpErrors: false, 
	});
	t.is(statusCode, 401);
});

test("GET /user/{username}/planner/progress returns exercise details successfully", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/planner/progress");

    t.is(statusCode, 200);
    
    t.true(Array.isArray(body.exercises));	// response contains an "exercises" array

    t.deepEqual(body.exercises, exercices);
});

test("GET /user/{usename}/planner/progress with invalid username", async (t) => {
	const { body, statusCode } = await t.context.got("user/no_name/planner/progress", {
		throwHttpErrors: false
	});
	t.is(statusCode, 401);
});

test("DELETE /user/{username}/reservations with Not Found (Non-existent reservation)", async (t) => {
	const { body, statusCode } = await t.context.got.delete("user/john_doe/reservations", {
		searchParams: {
			day: "2024-11-01",
			time: "20:00"	// No reservation at this time
		},
		throwHttpErrors: false
	});
	t.is(statusCode, 404);
});

 // PUT planner/progress //
test("PUT /user/{username}/planner/progress updates exercise progress entries successfully", async (t) => {
    // Send the PUT request
    const { body, statusCode } = await t.context.got.put("user/john_doe/planner/progress", {
        searchParams: benchPress,
        responseType: "json"
    });
    // Validate the response
    t.is(statusCode, 200);
    // Ensure updated progress matches expectations
    t.deepEqual(body.updatedProgress.weightPerDateEntries[benchPress.day - 1], benchPress.weight, "The updated exercise weight should match");
    t.deepEqual(body.updatedProgress.repetitionsPerDateEntries[benchPress.day - 1], benchPress.reps, "The updated exercise reps should match");
  });
  

    test("PUT /user/{username}/planner/progress with bad request", async (t) => {
        // Send the PUT request
        const { body, statusCode } = await t.context.got.put("user/john_doe/planner/progress", {
            json: newProgress,
            responseType: "json",
            throwHttpErrors: false
        });    

        t.is(statusCode, 400);
    });

    test("PUT /user/{username}/planner/progress with invalid username", async (t) => {
        // Send the PUT request
        const { body, statusCode } = await t.context.got.put("user/no_name/planner/progress", {
            throwHttpErrors: false,
            searchParams: benchPress,
            responseType: "json"
        });
    
        t.is(statusCode, 401);
    });

    test("PUT /user/{username}/planner/progress with non-existing exercise name", async (t) => {
    	// Send the PUT request
        const { body, statusCode } = await t.context.got.put("user/jane_smith/planner/progress",{
            throwHttpErrors: false,
            searchParams: benchPress,
            responseType: "json"
        });
    
        t.is(statusCode, 404);
    });

 // GET /planner/progress/goals //
test("GET /user/{usename}/progress/goals with Bad Request (no day parameter)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/planner/progress/goals", {
        throwHttpErrors: false
    });
    t.is(statusCode, 400);
});

test("GET /user/{usename}/progress/goals with Bad Request (no data for requested day)", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/planner/progress/goals", {
        searchParams: {day: 10},
        throwHttpErrors: false	// Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 404);
});

test("GET /user/{usename}/progress/goals with Bad Request (wrong day datatype)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/planner/progress/goals", {
        searchParams: {day: "hello"},
        throwHttpErrors: false	// Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 400);
});

test("GET /user/{usename}/progress/goals with Correct Request (Mock Data)", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/planner/progress/goals", {
        searchParams: {day: 2}
    });
    t.is(statusCode, 200);
    t.deepEqual(body, {message: [true, true, true, true, true], code: 200});	// Check with the mock data
}); 
