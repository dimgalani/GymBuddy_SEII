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

test("PUT /user/{username}/settings updates the bodyweight and other settings", async (t) => {
	//const username = "default";
	const newPersonalInfo = {
		bodyweight: 70.0, // Updated bodyweight
		gender: "female",
		goals: [true, false],
		goalConsistencyNum: 6,
		goalBodyWeightNum: 71.0,
	};

	const { body, statusCode } = await t.context.got.put("user/default/settings",
		{
		json: newPersonalInfo,
		responseType: "json",
		}
	);
	const { updatedInfo, message } = body;

	// Check for successful update response
	t.is(statusCode, 200);

	t.deepEqual(updatedInfo, newPersonalInfo, "The updated personal info should match");
	t.is(message, "Congratulations!");
	console.log(body);
});