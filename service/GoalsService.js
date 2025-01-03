'use strict';
const { usernames, UserSettings, ExerciseCatalog, userReservations, availableReservations, userProgress, usersPlanner } = require("./Database");
/**
 * Returns true/false depending bodyweight goal progress
 * FR10 - The system must be able to notify the user when their goals have been achieved
 *
 * username String the username of the connected person
 * currentBodyWeight Float 
 * returns Boolean
 * GET /user/{usename}/settings/goals
 **/
exports.checkGoalsFromInfo = function (currentBodyWeight, username) {
    return new Promise(function (resolve, reject) {
      // const storedBodyWeight = DefaultSettings.bodyweight;
      // Find the user in the array
      const user = UserSettings.find((user) => user.username === username);
      
      // Throw 401 error if the username is unknown
      if (!user) {
        //* OK
        reject({
          message: 'Response code 401 (Unauthorized): Not a valid username',
          code: 401,
        });
      }
  
      // If the current body weight is not provided in the request
      else if (!currentBodyWeight) {
        //* OK
        reject({
          message: 'Response code 400 (Bad Request): No currentBodyWeight parameter provided.',
          code: 400,
        });
      }
      else if (!Number.isInteger(currentBodyWeight)) {
        // If the data types are incorrect
        //* OK
        reject({
          message: 'Response code 400 (Bad Request): Wrong data types for currentBodyWeight.',
          code: 400,
        });
      }
  
      // If the user has the weight loss/gain goal active
      else if (user.settings.goals[3]){ 
        // Get the user's body weight
        const storedBodyWeight = user.settings.bodyweight;
        // If the user hasn't set his previous body weight - throw 404 error
        if(storedBodyWeight === null){
          //* OK
          reject({
            message: 'Response code 404 (Not Found): Previous BodyWeight data not found',
            code: 404,
          });
        }
  
        const GoalBodyWeight = user.settings.goalBodyWeightNum;
        // If the user hasn't set his goal body weight - throw 404 error
        if(!GoalBodyWeight){
          //* OK
          reject({
            message: 'Response code 404 (Not Found): Goal body weight data not found',
            code: 404,
          });
        }
  
        // Check if the current weight is closer to the goal weight than the stored weight
        if (Math.abs(GoalBodyWeight - currentBodyWeight) < Math.abs(GoalBodyWeight - storedBodyWeight)) {
          // If the user has reached the goal or has exceeded it
          if (currentBodyWeight === GoalBodyWeight || // If the user has reached the goal
              (storedBodyWeight > GoalBodyWeight && currentBodyWeight < GoalBodyWeight) || // If the user wants to lose weight and has exceeded the goal
              (storedBodyWeight < GoalBodyWeight && currentBodyWeight > GoalBodyWeight)) { // If the user wants to gain weight and has exceeded the goal
                resolve({ 
                  //* OK
                  message: "Victory Animation",
                  code: 200,
                });
          }
          else
          {
            // If the user is closer to the goal but has not reached it yet
            resolve({ 
              //* OK
              message: "Keep trying. You are closer to your goal",
              code: 200,
            });
          }
        } 
        else
        {
          // If the user is further from the goal
          resolve({ 
            //* OK
            message: "You can do better! I believe in you!",
            code: 200,
          });
        }
    } 
    else
      {
        // If the user does not have the weight loss/gain goal active
        resolve({ 
          //* OK
          message: "No weight loss/gain goal active",
          code: 200,
        });
      }
  });
  }
  
  
/**
 * Checks if the user has reached their goals based on progress of the selected exercise
 * FR10 - The system must be able to notify the user when his goals have been achieved
 *
 * username String the username of the connected person
 * day Integer the selected day of the planner
 * returns List
 **/

exports.checkGoalsFromProgress = function (day, username) {
  return new Promise(function (resolve, reject) {   
    if (!Number.isInteger(day) || typeof username !== 'string') {
      // If the data types are incorrect
      reject({
        message: 'Response code 400 (Bad Request): Wrong data types for username or day.',
        code: 400,
      });
    } else if (userProgress[username] && userProgress[username][day]) {
      // If user and day data exist
      resolve({
          message: userProgress[username][day],
          code: 200
      });
    } else {
      reject({
        message: 'Response code 404 (Not Found): No progress data found for the specified username and day.',
        code: 404,
      });
    }
  });
}