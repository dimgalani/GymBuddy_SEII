const test = require('ava');
const { app, setupTestContext, teardownTestContext } = require('../test_setup');
const { correctMale, correctFemale, wrongTypes } = require('./mockdata/settings');

test.before(async (t) => {
    await setupTestContext(t, app);
});

test.after(teardownTestContext);

// GET /settings //
test("GET /user/{username}/settings with Correct Request", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/settings", {
      throwHttpErrors: false,
    });

    t.is(statusCode, 200); // Ensure the status code is 200
    t.deepEqual(body, correctMale); // Verify the response body matches expected data
  });

 test("GET /user/{username}/settings with Bad Request (invalid username)", async (t) => {
    const { body, statusCode } = await t.context.got("user/invalid_user/settings", {
      throwHttpErrors: false,
    });
  
    t.is(statusCode, 401); // Unauthorized
  });  

  test("GET /user/{username}/settings with No Data Found", async (t) => {
    const { body, statusCode } = await t.context.got("user/alice_wonder/settings", {
      throwHttpErrors: false,
    });
  
    t.is(statusCode, 404); // Not Found
  }); 


 // PUT /settings //
test("PUT /user/{username}/settings updates the bodyweight and other settings", async (t) => {
    const { body, statusCode } = await t.context.got.put("user/jane_smith/settings", {
        json: correctFemale, // Updated bodyweight
        responseType: "json",
    });
    t.is(statusCode, 200);
    t.deepEqual(body.updatedInfo, correctFemale, "The updated personal info should match");
});

test("PUT /user/{username}/settings with Bad Request (wrong datatypes)", async (t) => {
    const { body, statusCode } = await t.context.got.put("user/jane_smith/settings",{
            json: wrongTypes,
            responseType: "json",
            throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
        });
    // Check for bad request response
    t.is(statusCode, 400);
});

test("PUT /user/{username}/settings with Bad Request ( username doesn't exists )", async (t) => {
    const { body, statusCode } = await t.context.got.put("user/dimitra/settings",{
            json: correctFemale,
            responseType: "json",
            throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
        });
    // Check for bad request response
    t.is(statusCode, 401);
    t.deepEqual(body.message, 'Response code 401 (Unauthorized): Not a valid username');
});


 // GET /user/{username}/settings/goals //
test("GET /user/{usename}/settings/goals with Correct Request ( Achieved Goal!!! )", async (t) => {
    const { body, statusCode } = await t.context.got("user/adrian_carter/settings/goals", {
        searchParams: {currentBodyWeight: "91.00"},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 200);
    t.deepEqual(body.message, 'Victory Animation');
});

test("GET /user/{usename}/settings/goals with Correct Request ( User is closer to the goal but hasn't achieved it yet. )", async (t) => {
    const { body, statusCode } = await t.context.got("user/adrian_carter/settings/goals", {
        searchParams: {currentBodyWeight: "80.00"},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 200);
    t.deepEqual(body.message, 'Keep trying. You are closer to your goal');
});

test("GET /user/{usename}/settings/goals with Correct Request ( User negative progress )", async (t) => {
    const { body, statusCode } = await t.context.got("user/adrian_carter/settings/goals", {
        searchParams: {currentBodyWeight: "70.00"},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 200);
    t.deepEqual(body.message, 'You can do better! I believe in you!');
});

test("GET /user/{usename}/settings/goals with Correct Request ( The goal weight loss/gain is not active)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/settings/goals", {
        searchParams: {currentBodyWeight: 81.00}
    });
    t.is(statusCode, 200);
    t.deepEqual(body.message, 'No weight loss/gain goal active');
});

test("GET /user/{usename}/settings/goals with Bad Request ( missing query param (currentBodyWeight) )", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/settings/goals", {
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 400);
});

test("GET /user/{usename}/settings/goals with Bad Request ( not previous BodyWeight data with goal enabled )", async (t) => {
    const { body, statusCode } = await t.context.got("user/john_doe/settings/goals", {
        searchParams: {currentBodyWeight: 81.00},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 404);
});

test("GET /user/{usename}/settings/goals with Bad Request ( wrong currentBodyWeight datatype)", async (t) => {
    const { body, statusCode } = await t.context.got("user/default/settings/goals", {
        searchParams: {currentBodyWeight: "hello"},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 400);
});

test("GET /user/{usename}/settings/goals with Bad Request ( username doesn't exist)", async (t) => {
    const { body, statusCode } = await t.context.got("user/dimitra/settings/goals", {
        searchParams: {currentBodyWeight: "55.00"},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 401);
});

test("GET /user/{usename}/settings/goals with Bad Request ( missing goal BodyWeight )", async (t) => {
    const { body, statusCode } = await t.context.got("user/nathaniel_brooks/settings/goals", {
        searchParams: {currentBodyWeight: "70.00"},
        throwHttpErrors: false // Prevent `got` from rejecting the promise on 4xx responses
    });
    t.is(statusCode, 404);
});
