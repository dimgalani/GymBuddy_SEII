// used by "GET /user/{usename}/reservations with Correct Request"
const reservation1 = {
    date: "2024-11-01",
    reservationsPerMuscleGroup: [1, 2, 3, 4, 5],
    time: "08:00",
    availability: 50
}

// used by "GET /user/{usename}/reservations with Correct Request"
const reservation2 = {
    date: "2024-11-01",
    reservationsPerMuscleGroup: [0, 0, 0, 0, 0],
    time: "10:00",
    availability: 50
}

// used by "GET /user/{username}/myreservations returns up to 3 upcoming reservations"
const upcomingReservations = [
    { date: "2024-11-02", muscleGroup: "lower", time: "10:00" },
    { date: "2024-11-03", muscleGroup: "core", time: "12:00" },
    { date: "2024-11-04", muscleGroup: "cardio", time: "06:00" }          
]

// used by "POST /user/{username}/reservations with Correct Request (Mock Data)"
// used by "POST /user/{username}/reservations with Bad Request (Not existing username)"
const bodyData = {
    date: "2024-11-01",
    time: "10:00",
    muscleGroup: "lower",
}

// used by "POST /user/{username}/reservations with Bad Request (Invalid data type)"
const bodyDataInvalidTypes = {
    date: 123,
    time: 123,
    muscleGroup: 123,
}

// used by "POST /user/{username}/reservations with Bad Request (Invalid muscle group)"
const bodyDataInvalidGroup = {
    date: "2024-11-01",
    time: "10:00",
    muscleGroup: "legs",
}

// used by "POST /user/{username}/reservations with Bad Request (Existing Reservation)"
const bodyDataExisting = {
    date: "2024-11-01",
    time: "10:00",
    muscleGroup: "upper",
}

// used by "DELETE /user/{username}/reservations with Correct Request (Mock Data)"
const query1 = {day: "2024-11-01", time: "08:00"}
// used by "DELETE /user/{username}/reservations with Bad Request (Invalid data types)"
const query2 = {day: undefined, time: false} // Invalid data types

module.exports = {reservation1, reservation2, bodyData, bodyDataInvalidTypes, bodyDataInvalidGroup, bodyDataExisting, query1, query2, upcomingReservations}