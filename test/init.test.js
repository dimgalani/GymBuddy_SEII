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

// test("GET /user/{usename}/catalog returns correct response and status code", async (t) => {
// 	const { body, statusCode } = await t.context.got("api");
// 	t.is(body.message, "Exercises Catalogue");
// 	t.is(statusCode, 200);
// });

test("GET /user/{usename}/settings/goals returns correct response and status code", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/catalog");
	//t.is(body.message, "Exercises Catalogue");
	t.is(statusCode, 200);
});