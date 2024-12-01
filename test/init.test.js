// import http from "node:http"; // const http = require('node:http');

// import test from "ava"; //const test = require("ava").default; h me ayton ton tropo idk
// import got from "got"; // const got = require('got');
const http = require('node:http');
const test = require('ava');
const got = require('got');
// const listen = require('test-listen');
// import app from "../server.js"; // fortwnwn ton server // const app = require.('../server.js');
const app = require('../index');
// ayta ta eixe sto elearning
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
// GET /planner/catalog //
/////////////////////////
test("GET /user/{usename}/planner/catalog returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/catalog");
	//t.is(body.message, "Exercises Catalogue");
	t.is(statusCode, 200);
	// Verify the body structure
	t.true(Array.isArray(body.exercises), "Exercises should be an array");
	t.is(body.exercises[0].name, "Lat Pull Down", "The first exercise name should be 'Lat Pull Down'");
	t.is(body.exercises[0].notes, "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-do...", "The first exercise notes should be 'Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-do...'");
	console.log(body);
});

/////////////////////////
// PUT /settings //
/////////////////////////
test("PUT /user/{username}/settings updates the bodyweight and other settings", async (t) => {
	//const username = "default";
	const newPersonalInfo = {
		bodyweight: 64.0, // Updated bodyweight
		gender: "female",
		goals: [false, true, true, true],
		goalConsistencyNum: 6,
		goalBodyWeightNum: 55.00,
	};

	const { body, statusCode } = await t.context.got.put("user/jane_smith/settings",
		{
		json: newPersonalInfo,
		responseType: "json",
		}
	);
	const { updatedInfo } = body;

	// Check for successful update response
	t.is(statusCode, 200);
	console.log("Full Response:", { body, statusCode });
	t.deepEqual(updatedInfo, newPersonalInfo, "The updated personal info should match");

});

test("PUT /user/{username}/settings with Bad Request (wrong datatypes)", async (t) => {
	const newPersonalInfo = {
		bodyweight: "hello", 
		gender: "2744",
		goals: [false, true, true, true],
		goalConsistencyNum: 6,
		goalBodyWeightNum: 55.00,
	};
	const { body, statusCode } = await t.context.got.put("user/jane_smith/settings",
		{
		json: newPersonalInfo,
		responseType: "json",
		throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
		});

	// Check for bad request response
	t.is(statusCode, 400);

});


/////////////////////////
// GET /user/{username}/settings/goals //
/////////////////////////

test("GET /user/{usename}/settings/goals with Correct Request (Mock Data)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/settings/goals", {
		searchParams: {
			currentBodyWeight: 81.00
		}
	});
	t.is(statusCode, 200);
	//t.deepEqual(body, [true, true, true, true, true]);  // Check with the mock data
});

test("GET /user/{usename}/settings/goals with Bad Request (no currentBodyWeight parameter)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/settings/goals", {
		throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
	});
	t.is(statusCode, 400);
});

test("GET /user/{usename}/settings/goals with Bad Request (not previous BodyWeight data with goal enabled)", async (t) => {
	const { body, statusCode } = await t.context.got("user/john_doe/settings/goals", {
		searchParams: {
			currentBodyWeight: 81.00
		},
		throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
	});
	t.is(statusCode, 404);
	console.log("Full Response:", { body, statusCode });
});

test("GET /user/{usename}/settings/goals with Bad Request (wrong currentBodyWeight datatype)", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/settings/goals", {
		searchParams: {
			currentBodyWeight: "hello"
		},
		throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
	});
	t.is(statusCode, 400);
	console.log("Full Response:", { body, statusCode });
});