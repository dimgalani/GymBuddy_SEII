const http = require('node:http');
const test = require('ava');
const got = require('got');

const app = require('../index');

test.before(async (t) => { 
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});

  //////////////////////////
 // GET /myreservations  //
//////////////////////////

test("GET /user/{username}/myreservations with Bad Request Format", async (t) => {
    const { statusCode, body } = await t.context.got("user/default/myreservations", {
        throwHttpErrors: false,
        searchParams: {
            day: "invalid_day"
        }
    });

    t.is(statusCode, 400);

});

test("GET /user/{username}/myreservations returns up to 3 upcoming reservations", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/myreservations",{
    });

    t.is(statusCode, 200);

    t.deepEqual(body, [
        { "date": "2024-11-01", "reservationsPerMuscleGroup": [1, 2, 3, 4, 5], "muscleGroup" : "muscleGroup", "time": "08:00 AM", "availability": 0 },
        { "date": "2024-11-01", "reservationsPerMuscleGroup": [0, 0, 0, 0, 0], "muscleGroup" : "muscleGroup", "time": "10:00 AM", "availability": 1 },
        { "date": "2024-11-02", "reservationsPerMuscleGroup": [10, 11, 12, 13, 14], "muscleGroup" : "muscleGroup", "time": "09:00 AM", "availability": 1 }
          
    ]);
});

test("GET /user/{username}/myreservations returns empty array if no reservations", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/myreservations");
    t.is(statusCode, 200);
    t.deepEqual(body, []); // Empty array
});

test("GET /user/{username}/myreservations with invalid username", async (t) => {
    const { statusCode, body } = await t.context.got("user/no_name/myreservations", {
        throwHttpErrors: false
    });

    t.is(statusCode, 401);

});

  //////////////////////////
 // GET planner/progress //
//////////////////////////

test("GET /user/{usename}/planner/progress with Bad Request Format", async (t) => {
	const { body, statusCode } = await t.context.got("user/default/planner/progress", {
		throwHttpErrors: false,
        searchParams: {
            day: "invalid_day" // Simulating an invalid query parameter
        }
	});
	t.is(statusCode, 400);
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

  //////////////////////////
 // PUT planner/progress //
//////////////////////////

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