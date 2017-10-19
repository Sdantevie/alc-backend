'use strict';
// Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Setting Up Schema
const StudentSchema = new Schema({
    name: {
        type: String
    },
    school: {
        type: String
    },
    course: {
        type: String,
    },
    subject: {
        type: String
    },
    link: {
        type: String
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