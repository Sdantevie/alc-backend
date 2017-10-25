'use strict';

const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('config'),
    Students = require('../models/studentModel.js');

//the Controls
exports.getStudents = (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, config.SecretKey, (err, decoded) => {
        err ? res.status(403).json({ message: 'No Token Provided' }) :
            Students.find({}, (err, students) => {
                console.log();
                err ? res.send(err) : res.json(students);
            });
    });
};

//this will create a new document.
exports.postStudent = (req, res) => {
    let newStudent = new Students(req.body);
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, config.SecretKey, (err, decoded) => {
        err ? res.status(403).json({ message: 'No Token Provided' }) :
            newStudent.save((err, data) => {
                err ? res.send(err) : res.json(data);
            });
    });
};

// this will edit any document matched the param id.
exports.updateStudent = (req, res) => {
    Students.findById({ _id: req.params.id }, (err, student) => {
        err ? res.send(err) :
            Object.assign(student, req.body).save((err, student) => {
                err ? res.send(err) : res.json(student);
            });
    });
}

//this will return documents of the student.
exports.getStudentByName = (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, config.SecretKey, (err, decoded) => {
        Students.find({ name: new RegExp(req.params.name, 'i') }, (err, students) => {
            err ? res.send(err) : res.json(students);
        });
    });
};

exports.getStudentById = (req, res) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    jwt.verify(token, config.SecretKey, (err, decoded) => {
        Students.findById({ _id: req.params.id }, (err, students) => {
            err ? res.send(err) : res.json(students);
        });
    });
};


//this totally removes everything from the database
exports.deleteResource = (req, res) => {
    Students.remove({ _id: req.params.id }, (err, student) => {
        err ? res.send(err) : res.json(student);
    });
}

//this ensures that this api is only visited by the student resource center
exports.authenticate = (req, res) => {
    req.body.name === config.SecretKey ?
        jwt.sign(req.body, config.SecretKey, { expiresIn: 86400 }, (err, token) => {
            let response = {
                message: 'Authorized',
                token: token
            };
            res.json(response);
        }) :
        res.status(500).send({ message: 'Not Authorized' });

}