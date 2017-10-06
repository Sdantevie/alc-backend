'use strict';

const mongoose = require('mongoose'),
    Students = require('../models/studentModel.js');

//the Controls
exports.getStudents = (req, res) => {
    Students.find({}, (err, students) => {
        err ? res.send(err) : res.json(students);
    });
};

exports.postStudent = (req, res) => {
    let newStudent = new Students(req.body);
    newStudent.save((err, data) => {
        err ? res.send(err) : res.json(data);
    });
};

exports.updateStudent = (req, res) => {
    Students.findById({ _id: req.params.id }, (err, student) => {
        err ? res.send(err) :
            Object.assign(student, req.body).save((err, student) => {
                err ? res.send(err) : res.json(student);
            });
    });
}

exports.getStudent = (req, res) => {
    Students.findById({ _id: req.params.id }, (err, student) => {
        err ? res.send(err) : res.json(student);
    });
};

exports.deleteStudent = (req, res) => {
    Students.remove({ _id: req.params.id }, (err, student) => {
        err ? res.send(err) : res.json(student);
    });
}