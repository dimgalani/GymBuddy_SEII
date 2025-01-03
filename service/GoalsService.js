"use strict";
const { UserSettings, userProgress } = require("./Database");

/**
 * Validates the username and retrieves user data.
 * @param {string} username
 * @returns {Object} User data or throws an error if not found.
 */
function validateAndGetUser(username) {
  const user = UserSettings.find((user) => user.username === username);
  if (!user) {
    throw {
      message: 'Response code 401 (Unauthorized): Not a valid username',
      code: 401,
    };
  }
  return user;
}

/**
 * Validates the currentBodyWeight parameter.
 * @param {any} currentBodyWeight
 */
function validateBodyWeight(currentBodyWeight) {
  if (currentBodyWeight === undefined || currentBodyWeight === null) {
    throw {
      message: 'Response code 400 (Bad Request): No currentBodyWeight parameter provided.',
      code: 400,
    };
  }
  if (!Number.isInteger(currentBodyWeight)) {
    throw {
      message: 'Response code 400 (Bad Request): Wrong data types for currentBodyWeight.',
      code: 400,
    };
  }
}

/**
 * Checks the weight-related goals of the user.
 * @param {Object} user
 * @param {number} currentBodyWeight
 * @returns {Object} Result message and code.
 */
function checkWeightGoal(user, currentBodyWeight) {
  const storedBodyWeight = user.settings.bodyweight;
  if (storedBodyWeight === null) {
    throw {
      message: 'Response code 404 (Not Found): Previous BodyWeight data not found',
      code: 404,
    };
  }

  const goalBodyWeight = user.settings.goalBodyWeightNum;
  if (!goalBodyWeight) {
    throw {
      message: 'Response code 404 (Not Found): Goal body weight data not found',
      code: 404,
    };
  }

  const isCloserToGoal = Math.abs(goalBodyWeight - currentBodyWeight) < Math.abs(goalBodyWeight - storedBodyWeight);

  if (isCloserToGoal) {
    if (
      currentBodyWeight === goalBodyWeight ||
      (storedBodyWeight > goalBodyWeight && currentBodyWeight < goalBodyWeight) ||
      (storedBodyWeight < goalBodyWeight && currentBodyWeight > goalBodyWeight)
    ) {
      return { message: "Victory Animation", code: 200 };
    }
    return { message: "Keep trying. You are closer to your goal", code: 200 };
  }

  return { message: "You can do better! I believe in you!", code: 200 };
}

/**
 * Checks if the user has a weight loss/gain goal active.
 * @param {Object} user
 * @returns {boolean}
 */
function hasActiveWeightGoal(user) {
  return user.settings.goals[3];
}

/**
 * Returns true/false depending on bodyweight goal progress.
 * FR10 - The system must be able to notify the user when their goals have been achieved.
 *
 * @param {number} currentBodyWeight
 * @param {string} username
 * @returns {Promise<Object>} Resolves with a result message and code.
 */
exports.checkGoalsFromInfo = function (currentBodyWeight, username) {
  return new Promise(function (resolve, reject) {
    try {
      const user = validateAndGetUser(username);
      validateBodyWeight(currentBodyWeight);

      if (hasActiveWeightGoal(user)) {
        resolve(checkWeightGoal(user, currentBodyWeight));
      } else {
        resolve({ message: "No weight loss/gain goal active", code: 200 });
      }
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Checks the progress of the user's exercise goals.
 * @param {number} day
 * @param {string} username
 * @returns {Promise<Object>} Resolves with progress data or rejects with an error.
 */
exports.checkGoalsFromProgress = function (day, username) {
  return new Promise(function (resolve, reject) {
    try {
      if (!Number.isInteger(day) || typeof username !== 'string') {
        throw {
          message: 'Response code 400 (Bad Request): Wrong data types for username or day.',
          code: 400,
        };
      }

      const userProgressData = userProgress[username]?.[day];
      if (userProgressData) {
        resolve({ message: userProgressData, code: 200 });
      } else {
        throw {
          message: 'Response code 404 (Not Found): No progress data found for the specified username and day.',
          code: 404,
        };
      }
    } catch (error) {
      reject(error);
    }
  });
};
