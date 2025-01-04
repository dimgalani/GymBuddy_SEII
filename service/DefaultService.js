'use strict';

const { use } = require("..");

const { usernames, UserSettings } = require("./Database");

/**
 * Returns the bodyweight, gender, activated goals, desired bodyweight and desired workout frequency
 * FR1  - The user must be able to edit their personal data
 *
 * username String the username of the connected person
 * returns PersonalInfo
 **/
exports.getPersonalInfo = function (username) {
    return new Promise(function (resolve, reject) {
      const userData = {
        john_doe: {
          gender: "male",
          goalConsistencyNum: 4,
          goalBodyWeightNum: 75,
          bodyweight: 80.5,
          goals: [true, false, true],
        },
        jane_smith: {
          gender: "female",
          goalConsistencyNum: 5,
          goalBodyWeightNum: 60,
          bodyweight: 62.3,
          goals: [true, true, true],
        },
        default: {
          gender: "",
          goalConsistencyNum: 0,
          goalBodyWeightNum: 0,
          bodyweight: 0,
          goals: [],
        },
      };
 
      // Invalid username
      if (!usernames.includes(username)) {
        reject({
          message: "Unauthorized access. Invalid username.",
          code: 401,
        });
        return;
      }
      // User data not found
      if (!userData[username]) {
        reject({
          message: `No data found for username ${username}.`,
          code: 404,
        });
        return;
      }
      // Valid user data
      resolve(userData[username]);
    });
  };


/**
 * Updates the bodyweight, gender, activated goals, desired bodyweight and desired workout frequency
 * FR1  - The user must be able to edit their personal data
 *
 * body PersonalInfo A json object containing the Personal info
 * username String the username of the connected person
 * no response value expected for this operation
 * PUT /user/{username}/settings
 **/
// Update personal info function
exports.updatePersonalInfo = function ( newSettings, username,) {
  return new Promise(function (resolve, reject) {
    // Find the user in the UserSettings array
    const user = UserSettings.find((user) => user.username === username);
    if (!user) {
      console.log("user not found");
      reject({
        message: 'Response code 401 (Unauthorized): Not a valid username',
        code: 401,
      });
    }
    if(!Number.isInteger(newSettings.bodyweight) || newSettings.bodyweight < 0 || !String(newSettings.gender) ||
       !Array.isArray(newSettings.goals) || newSettings.goals.length !== 4 || !newSettings.goals.every((value) => typeof value === "boolean") ||
       !Number.isInteger(newSettings.goalConsistencyNum) || !Number.isInteger(newSettings.goalBodyWeightNum) || newSettings.goalConsistencyNum < 0 || newSettings.goalBodyWeightNum < 0 ) {
        reject({
        message: 'Response code 400 (Bad Request): Wrong data types.',
        code: 400,
      });
    }
      
    // Update the user's settings
    user.settings.bodyweight = newSettings.bodyweight;
    user.settings.gender = newSettings.gender;
    user.settings.goalConsistencyNum = newSettings.goalConsistencyNum;
    user.settings.goalBodyWeightNum = newSettings.goalBodyWeightNum;
    user.settings.goals = newSettings.goals;
    // Resolve with the updated settings and the message
    resolve({
      updatedInfo: user.settings, 
      message: 'Response code 200 (OK). Settings successfully updated',
      code: 200,
    });
  });
};