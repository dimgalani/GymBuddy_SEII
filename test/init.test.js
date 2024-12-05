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


// auto to test den eixe polu noima me katholou exercise name giati uparxei antistoixo endpoint
// vazo kalitera askisi pou den einai valid px no_exercise
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
  

test("GET /user/{usename}/planner/catalog/{exercise_name} with Correct Request (Mock Data)", async (t) => {
	const { body, statusCode } = await t.context.got("user/john_doe/planner/catalog/lat-pull-down", {
		throwHttpErrors: false
	});

	t.is(statusCode, 200);

	t.deepEqual(body, {
		name: "Lat Pull Down",
	 	notes: "Targets the latissimus dorsi muscles, which are the large muscles of the back. Setup: Sit on a lat pull-down machine with your knees securely under the pads. Adjust the thigh pads to fit comfortably against your thighs. Grasp the wide bar with an overhand grip, hands slightly wider than shoulder-width apart.",
		weightPerDateEntries: [40.0, 42.5, 45.0],
		repetitionsPerDateEntries: [10, 12, 14],
	  });
});

test("GET /user/{usename}/planner/catalog/{exercise_name} with Correct Request and no exercise progress", async (t) => {
	const { body, statusCode } = await t.context.got("user/jane_smith/planner/catalog/deadlift", {
		throwHttpErrors: false
	});
	t.is(statusCode, 200);
	t.deepEqual(body, {
		name: "deadlift",
		notes: "Focus on keeping a neutral spine and engage your core. Avoid rounding your back during the lift.",
		weightPerDateEntries: [],
		repetitionsPerDateEntries: [],
	  });
});
//idk an theloume na einai bad request
// parapempei se invalid exercise pou exoyme idi panw
// an exo ena adeio exercise log, px den exo kanei pote squats, thewritika uparxei idi stin basi me kena arrays

///////////////////////
// GET /planner //
///////////////////////

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
                day: 5, // Testing for a missing planner day
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
	try {
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
	
	t.is(statusCode, 200);
	t.deepEqual(body, {
		currentDate: 1,
		exercisesList: [],
	});
});	
