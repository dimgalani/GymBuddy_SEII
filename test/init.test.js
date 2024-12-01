const http = require('node:http');
const test = require('ava');
const got = require('got');

const app = require('../index');

test.before(async (t) => { // einai async giati tha trexei prin ta tests?? to async paei mazi me to await
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

/////////////////////////
// GET /progress/goals //
/////////////////////////

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
	t.deepEqual(body, [true, true, true, true, true]);  // Check with the mock data
});

///////////////////////
// GET /reservations //
///////////////////////

test("GET /user/{usename}/reservations with Bad Request (no day parameter)", async (t) => {
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
		{ "date": "2024-11-01", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "time": "08:00 AM", "availability": 5 },
		{ "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:00 AM", "availability": 10 }
	  ]);  // Check with the mock data
});

////////////////////////
// POST /reservations //
////////////////////////

test("POST /user/{username}/reservations with Correct Request", async (t) => {
	const bodyData = {
		date: "2024-11-01",
	  	time: "10:00",
	  	muscleGroup: "lower",
	};

	const searchParams = {
	  	day: "2024-11-01",
	  	time: "10:00",
	  	musclegroup: "lower",
	}
 
	try {
	  const { body, statusCode } = await t.context.got.post("user/john_doe/reservations", {
		json: bodyData,
		searchParams: searchParams
	  });
	  console.log("Response:", body);
	  t.is(statusCode, 201);
	} catch (error) {
	  console.error("Error:", error.response?.body || error.message);
	  t.fail(error.message);
	}
 });
 