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

test("GET /user/{usename}/settings/goals with Bad Request (no day parameter)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/progress/goals", {
		throwHttpErrors: false // Prevent `got` from rejecting the promise on 400 responses
	});
	t.is(statusCode, 400);
});

test("GET /user/{usename}/settings/goals with Correct Request (Mock Data)", async (t) => {
	const { body, statusCode } = await t.context.got("user/john_doe/planner/progress/goals", {
		searchParams: {
			day: 2
		}
	});
	t.is(statusCode, 200);
	t.deepEqual(body, [true, true, true, true, true]);  // Check with the mock data
});

test("GET /user/{usename}/reservations with Bad Request (no day parameter)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/reservations", {
		throwHttpErrors: false // Prevent `got` from rejecting the promise on 400 responses
	});
	t.is(statusCode, 400);
});

test("GET /user/{usename}/reservations with Correct Request", async (t) => {
	const { body, statusCode } = await t.context.got("user/john_doe/reservations", {
		searchParams: {
			day: 1
		}
	});
	t.is(statusCode, 200);
	t.deepEqual(body, [
		{ "date": "2024-11-01", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "time": "08:00 AM", "availability": 0 },
		{ "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "time": "10:00 AM", "availability": 1 }
	  ]);  // Check with the mock data
});