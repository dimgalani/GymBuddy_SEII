const http = require('node:http');
const test = require('ava');
const got = require('got');

const app = require('../index');

test.before(async (t) => {  
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
	server.unref();
});

test.after.always((t) => {
	t.context.server.close();
});

/////////////////////////
// GET /catalog/{exercise-name} //
///////////////////////// 

test("GET /user/{usename}/planner/catalog/{exercise-name} with Bad Request (missing exercise-name parameter)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/catalog/", {
		 // No additional path parameters added to simulate a missing 'exercise-name'
		throwHttpErrors: false 
	});

	console.log(body);

	t.is(statusCode, 400);
	t.true(body.error.includes("exercise-name is required")); //verify that the response body from the server contains a specific error message
});


test("GET /user/{username}/planner/catalog/{exercise-name} with Bad Request (invalid username)", async (t) => {
	const { body, statusCode } = await t.context.got("user/invalid_user/planner/catalog/Lat_Pull_Down", {
	  throwHttpErrors: false
	});

	t.is(statusCode, 401);
  
});
  

test("GET /user/{usename}/planner/catalog/{exercise-name} with Correct Request (Mock Data)", async (t) => {
	const { body, statusCode } = await t.context.got("user/john_doe/planner/catalog/Lat_Pull_Down", {
	throwHttpErrors: false
	});

	t.is(statusCode, 200);

	t.deepEqual(body, {
		weightPerDateEntries: [40.0, 42.5, 45.0],
		repetitionsPerDateEntries: [10, 12, 14],
	  });
});


test("GET /user/{usename}/planner/catalog/{exercise-name} with Correct Request if there isn't any exercise progresσ recorded for an exercise", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/catalog/any_exercise", {
			throwHttpErrors: false
	});
    t.is(statusCode, 200);
    t.deepEqual(body, {});
});
//idk an theloume na einai bad request

///////////////////////
// GET /planner //
///////////////////////

test("GET /user/{username}/planner with Bad Request (no day parameter)", async (t) => {
    try {
        const { body, statusCode } = await t.context.got("user/default/planner", {
            throwHttpErrors: false,
        });
        console.log(body, statusCode);
        t.is(statusCode, 400); // Expect a 400 Bad Request
    } catch (error) {
        console.error("Test failed:", error.message);
        t.fail(error.message);
    }
});


test("GET /user/{username}/planner with Bad Request or Not Found", async (t) => {
    //try {
        const { body, statusCode } = await t.context.got("user/john_doe/planner", {
            searchParams: {
                day: 5, // Testing for a missing planner day
            },
            throwHttpErrors: false,
        });
		t.is(statusCode, 404);

        console.log(body, statusCode);
});


test("GET /user/{usename}/planner with Bad Request (wrong day datatype)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner", {
		searchParams: {
			day: "invalid_day"
		},
		throwHttpErrors: false
	});
	console.log(body, statusCode);
	t.is(statusCode, 400);
});


test("GET /user/{usename}/planner with Correct Request", async (t) => {
	try {
		const { body, statusCode } = await t.context.got("user/john_doe/planner", {
			searchParams: {
				day: 1
			},
			throwHttpErrors: false
		});
		console.log("Response Body:", body);
		console.log("Response Status Code:", statusCode);
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
	} catch (error) {
		console.error("Test failed:", error.message);
		// Log additional details to help debug
		console.error("Error details:", error.response.body);
		t.fail(error.message);
	}
});

test("GET /user/{username}/planner with Default User", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner", {
		searchParams: {
		day: 1,
		},
	});
	console.log(body, statusCode);
	
	t.is(statusCode, 200);
	t.deepEqual(body, {
		currentDate: 1,
		exercisesList: [],
	});
});	
