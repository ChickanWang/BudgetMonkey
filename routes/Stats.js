const express = require('express');
const statsRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const Spendings = require('../models/Spendings');
//const Idee = require('../models/Idee');
const User = require('../models/User');
const { ensureAuthenticated } = require('../auth');

// Finds the stats of a particular category of a particular month n year.
function MonthStats(array, prop, month, year) {
    count = 0;

    for (i = 0; i < array.length; i++) {
        const Month = new Date(array[i]['date']).getMonth();
        const Year = new Date(array[i]['date']).getFullYear();

        if ((Month == month) && (Year == year)) {
            if (array[i]['category'] == prop) {
                count += array[i]['cost'];
            }
        }
    }
    return count;
}

// Finds Total Spendings in Month
function MonthTotal(array, month, year) {
    count1 = 0;

    for (l = 0; l < array.length; l++) {
        const Month = new Date(array[l]['date']).getMonth();
        const Year = new Date(array[l]['date']).getFullYear();

        if ((Month == month) && (Year == year)) {
            count1 += array[l]['cost'];
        }
    }
    return count1;
}

// Finds if a particular month n year is already in the array.
function dateUsed(monthyear, array) {
    for (k = 0; k < array.length; k++) {
        if (monthyear == array[k]){
            return false;}
    }

    return true;
}

// Returns an array of months and years with their stats.
function Stats(array) {
    const MonthYearsCompleted = [];
    const TotalStatstics = [];

    for (j = 0; j < array.length; j++) {
        const Month = new Date(array[j]['date']).getMonth();
        const Year = new Date(array[j]['date']).getFullYear();

        if (dateUsed((Month + (Year * 100)), MonthYearsCompleted)){

            TotalStatstics.push([Year, Month + 1,
            MonthStats(array, 'food', Month, Year),
            MonthStats(array, 'lifestyle', Month, Year),
            MonthStats(array, 'indulgent', Month, Year),
            MonthStats(array, 'other', Month, Year), 
            MonthTotal(array, Month, Year)]);

            MonthYearsCompleted.push(Month + (Year * 100));
        }
    }

    return TotalStatstics;
}

statsRouter.post('/stats',ensureAuthenticated,(req,res)=>{
    res.send(Stats(req.user.spendings));
});

module.exports = statsRouter;