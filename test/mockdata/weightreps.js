/*
File to keep the three mock examples for progress
Divided for maintainability reasons
*/

// weight perfomed, index indicates the day
const weightPerDateEntries = [
    [5, 6, 6, 8, 8, 5, 6, 6, 8, 8],
    [20, 25, 25, 25 ,30, 20, 25, 25, 25, 30],
    [30, 35, 35, 40, 45, 30, 35, 35, 40, 45]
]
// repetitions perfomed, index indicates the day
const repetitionsPerDateEntries = [
    [10, 10, 15, 10, 10],
    [15, 15, 15, 20, 15],
    [5, 5, 5, 5, 8]
]

module.exports = {weightPerDateEntries, repetitionsPerDateEntries}