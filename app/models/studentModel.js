'use strict';
// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Setting Up Schema
const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    modifiedOn: {
        type: Date,
    },
});

module.exports = mongoose.model('Student', StudentSchema);