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
 * This file contains tests for the Planner Progress API endpoints.
 * It ensures the correctness of functionalities related to retrieving, updating, 
 * and managing exercise progress data, as well as validating user-specific 
 * planner progress and goals. The tests include scenarios for both valid 
 * and invalid requests, covering edge cases like missing parameters, incorrect 
 * data types, and non-existent users or exercises.
 */

// GET /planner //
test("GET /user/{username}/planner with Bad Request (no day parameter)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner", {
		throwHttpErrors: false,
	});
	t.is(statusCode, 400); // Expect a 400 Bad Request
    
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

 // GET planner/progress //
test("GET /user/{usename}/planner/progress with Bad Request Format", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/progress", {
		throwHttpErrors: false,
        searchParams: {
            day: "invalid_day" // Simulating an invalid query parameter
        }
	});
	t.is(statusCode, 400);
});

test("DELETE /user/{username}/reservations with Unauthorized Request (Non-existent username)", async (t) => {
	const { body, statusCode } = await t.context.got.delete("user/non_existent_user/reservations", {
		searchParams: {
			day: "2024-11-01",
			time: "08:00"
		},
		throwHttpErrors: false, 
	});
	t.is(statusCode, 401);
});

test("GET /user/{username}/planner/progress returns exercise details successfully", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/planner/progress");

    t.is(statusCode, 200);
    
    t.true(Array.isArray(body.exercises)); // response contains an "exercises" array

    t.deepEqual(body.exercises, [
        { "notes" : "note1", "name" : "exercise_1", "weightPerDateEntries" : [ 5, 6, 6, 8, 8, 5, 6, 6, 8, 8], "repetitionsPerDateEntries" : [ 10, 10, 15, 10, 10 ] },
        { "notes" : "note2", "name" : "exercise_2", "weightPerDateEntries" : [ 20, 25, 25, 25 ,30, 20, 25, 25, 25 ,30], "repetitionsPerDateEntries" : [ 15, 15, 15, 20, 15 ]  },
        { "notes" : "note3", "name" : "exercise_3", "weightPerDateEntries" : [ 30, 35, 35, 40, 45, 30, 35, 35, 40, 45], "repetitionsPerDateEntries" : [ 5, 5, 5, 5 ,8 ] }
    ]);
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
			time: "20:00" // No reservation at this time
		},
		throwHttpErrors: false
	});
	t.is(statusCode, 404);
});

 // PUT planner/progress //
test("PUT /user/{username}/planner/progress updates exercise progress entries successfully", async (t) => {
    const day = 8;
    const name = "Bench_Press";
    const weight = 70;
    const reps = 10;
  
    // Send the PUT request
    const { body, statusCode } = await t.context.got.put("user/john_doe/planner/progress", {
        searchParams: {
            day: day,
            name: name,
            weight: weight,
            reps: reps
        },
        responseType: "json"
    });

    // Validate the response
    t.is(statusCode, 200);
  
    // Ensure updated progress matches expectations
    t.deepEqual(body.updatedProgress.weightPerDateEntries[day - 1], weight, "The updated exercise weight should match");
    t.deepEqual(body.updatedProgress.repetitionsPerDateEntries[day - 1], reps, "The updated exercise reps should match");
  });
  

    test("PUT /user/{username}/planner/progress with bad request", async (t) => {
        const day = 10;
        const newProgress = {
            name: "Bench Press",
            weightPerDateEntries: "1234",
            repetitionsPerDateEntries: 10
        };
    
    // Send the PUT request
        const { body, statusCode } = await t.context.got.put("user/john_doe/planner/progress",
            {
                json: newProgress,
                responseType: "json",
                throwHttpErrors: false
            });    
    
        t.is(statusCode, 400);
    });

    test("PUT /user/{username}/planner/progress with invalid username", async (t) => {
        const day = 8;
        const name = "Bench_Press";
        const weight = 70;
        const reps = 10;
    
    // Send the PUT request
        const { body, statusCode } = await t.context.got.put("user/no_name/planner/progress",
            {
                throwHttpErrors: false,
                searchParams: {
                    day: day,
                    name: name,
                    weight: weight,
                    reps: reps
                },
                responseType: "json"
            }
        );
    
        t.is(statusCode, 401);
    });

    test("PUT /user/{username}/planner/progress with non-existing exercise name", async (t) => {
        const day = 8;
        const name = "Bench_Press";
        const weight = 70;
        const reps = 10;
    
    // Send the PUT request
        const { body, statusCode } = await t.context.got.put("user/jane_smith/planner/progress",{
                throwHttpErrors: false,
                searchParams: {
                    day: day,
                    name: name,
                    weight: weight,
                    reps: reps
                },
                responseType: "json"
            }
        );
    
        t.is(statusCode, 404);
    });

 // GET /planner/progress/goals //
test("GET /user/{usename}/progress/goals with Bad Request (no day parameter)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/planner/progress/goals", {
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 400);
});

test("GET /user/{usename}/progress/goals with Bad Request (no data for requested day)", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/planner/progress/goals", {
        searchParams: {
            day: 10
        },
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 404);
});

test("GET /user/{usename}/progress/goals with Bad Request (wrong day datatype)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/planner/progress/goals", {
        searchParams: {
            day: "hello"
        },
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 400);
});

test("GET /user/{usename}/progress/goals with Correct Request (Mock Data)", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/planner/progress/goals", {
        searchParams: {
            day: 2
        }
    });
    t.is(statusCode, 200);
    t.deepEqual(body, {message: [true, true, true, true, true], code: 200});  // Check with the mock data
});    
