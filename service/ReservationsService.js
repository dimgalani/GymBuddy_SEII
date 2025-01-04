'use strict';
const { usernames, userReservations, availableReservations } = require("./Database");
/**
 * Cancels a reservation by deleting it
 * FR4 - The user must be able to cancel a reservation
 *
 * username String the username of the connected person
 * day Long the day of the reservation
 * no response value expected for this operation
 **/
exports.cancelReservation = function (day, time, username) {
    return new Promise(function (resolve, reject) {
      // Step 1: Validate data types
      if (typeof username !== "string" || typeof day !== "string" || typeof time !== "string") {
        return reject({
          message: "Response code 400 (Bad Request): Invalid data types.",
          code: 400
        });
      }
  
      // Step 2: Check if the username exists
      if (!userReservations[username]) {
        return reject({
          message: "Response code 401 (Unauthorized): Username not found.",
          code: 401
        });
      }
  
      // Step 3: Check if the reservation exists
      const reservationIndex = userReservations[username].findIndex(
        (reservation) => reservation.date === day && reservation.time === time
      );
  
      if (reservationIndex === -1) {
        return reject({
          message: "Response code 404 (Not Found): Reservation does not exist.",
          code: 404
        });
      }
  
      // Step 4: Delete the reservation
      userReservations[username].splice(reservationIndex, 1);
  
      // Return success response
      resolve({
        message: "Reservation successfully canceled.",
        code: 202
      });
    });
  };

  /**
 * Returns all the reservations' details for a specific day (time, available seats)
 * FR2 - The user must be able to see the availability of a certain date and time
 *
 * username String the username of the connected person
 * day String the day selected for a reservation
 * returns List
 **/

exports.getAvailableReservations = function (day, username) {
    return new Promise(function (resolve, reject) {
      // Check if username exists
      if (!usernames.includes(username)) {
        reject({
          message: 'Response code 401 (Unauthorized): Not a valid username',
          code: 401
        });
      } else if (availableReservations[day]) {
        resolve(availableReservations[day]); // Return the reservations for the specified day
      } else {
        reject({
          message: 'Response code 404 (Not Found): No reservations found for the specified day.',
          code: 404
        });
      }
    });
  };

  /**
 * Returns the three upcoming reservations of a user
 * FR5 - The user must be able to see their reservations
 *
 * username String the username of the connected person
 * returns List
 **/
exports.getMyReservations = function (username) {
    return new Promise(function (resolve, reject) {
      // Validate username
      if (!usernames.includes(username)) {
        return reject({
          message: 'Response code 401 (Unauthorized): Not a valid username',
          code: 401
        });
      }
  
      // Get reservations for the username or return empty array if none
      const reservations = userReservations[username].slice(-3);
      resolve(reservations);
    });
  };

/**
 * Submits a reservation for a selected day and time
 * FR3 - A user must be able to make a reservation
 *
 * body Reservation A json object containing the Reservation info
 * day String the selected day
 * time String the selected time
 * musclegroup String the muscle group the user will train
 * username String the username of the connected person
 * no response value expected for this operation
 **/
exports.makeReservation = function (body, username) {
    const validMuscleGroups = ["upper", "lower", "core", "cardio"];
  
    return new Promise(function (resolve, reject) {
      // Step 1: Validate data types
      if (
        typeof body.date !== "string" ||
        typeof body.time !== "string" ||
        typeof body.muscleGroup !== "string" ||
        typeof username !== "string"
      ) {
        return reject({
          message: "Response code 400 (Bad Request): Invalid data types.",
          code: 400
        });
      }
  
      // Step 2: Check if the muscle group is valid
      if (!validMuscleGroups.includes(body.muscleGroup)) {
        return reject({
          message: `Response code 400 (Bad Request): Invalid muscle group. Must be one of ${validMuscleGroups.join(", ")}.`,
          code: 400
        });
      }
  
      // Step 3: Check if the username exists
      if (!userReservations[username]) {
        return reject({
          message: "Response code 401 (Unauthorized): Username not found.",
          code: 401
        });
      }
  
      // Step 4: Check for existing reservations at the same time
      const existingReservations = userReservations[username].filter(
        (reservation) => reservation.date === body.date && reservation.time === body.time
      );
      if (existingReservations.length > 0) {
        return reject({
          message: "Response code 409 (Conflict): Time slot already reserved.",
          code: 409
        });
      }
  
      // Step 5: Create and append the reservation
      const newReservation = { date: body.date, muscleGroup: body.muscleGroup, time: body.time };
      userReservations[username].push(newReservation);
  
      // Return the updated reservations for the user
      resolve({
        message: "Reservation successfully created.",
        code: 201
      });
    });
  };