const test = require('ava');
const { app, setupTestContext, teardownTestContext } = require('../test_setup');
const { defaultUser, johnDoe, janeSmith } = require('./mockdata/plannercatalog');

test.before(async (t) => {
    await setupTestContext(t, app);
});

test.after(teardownTestContext);

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
		t.deepEqual(body, johnDoe.planner);
});

test("GET /user/{username}/planner with Default User", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner", {
		searchParams: {
		day: 1,
		},
	});
	
	t.is(statusCode, 200);
	t.deepEqual(body, defaultUser.planner);
});


 // GET /planner/catalog //
test("GET /user/{usename}/planner/catalog returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/catalog");
	//t.is(body.message, "Exercises Catalogue");
	t.is(statusCode, 200);
	// Verify the body structure
	t.true(Array.isArray(body.exercises), "Exercises should be an array");
	t.deepEqual(body.exercises[0], defaultUser.latPullDown);
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
	const { body, statusCode } = await t.context.got.post("user/default/planner/catalog", {
		json: defaultUser.benchPress,
		responseType: "json",
	});
	t.is(statusCode, 201);
	t.deepEqual(body.exercise, defaultUser.benchPress);
});

test("POST /user/{username}/planner/catalog with Bad Request - Already existing exercise", async (t) => {
	const { body, statusCode } = await t.context.got.post("user/default/planner/catalog", {
		json: defaultUser.new,
		responseType: "json",
		throwHttpErrors: false
	});
	t.is(statusCode, 409);
	t.deepEqual(body.exercise, defaultUser.deadlift);
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
	t.deepEqual(body, johnDoe.latPullDown);
});

test("GET /user/{usename}/planner/catalog/{exercise_name} with Correct Request and no exercise progress", async (t) => {
	const { body, statusCode } = await t.context.got("user/jane_smith/planner/catalog/deadlift", {
		throwHttpErrors: false
	});
	t.is(statusCode, 200);
	t.deepEqual(body, janeSmith.deadlift);
});
