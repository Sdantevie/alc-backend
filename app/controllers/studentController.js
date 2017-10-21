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
                err ? res.send(err) : res.json({ student: "Hello", data: students });
            });
    });
};

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

exports.updateStudent = (req, res) => {
    Students.findById({ _id: req.params.id }, (err, student) => {
        err ? res.send(err) :
            Object.assign(student, req.body).save((err, student) => {
                err ? res.send(err) : res.json(student);
            });
    });
}

// exports.getStudentByID = (req, res) => {
//     Students.findById({ _id: req.params.id }, (err, student) => {
//         err ? res.send(err) : res.json(student);
//     });
// };

exports.getStudentByName = (req, res) => {
    Students.find({ name: new RegExp(req.params.name, 'i') }, (err, students) => {
        err ? res.send(err) : res.json(students);
    });
};

exports.deleteStudent = (req, res) => {
    Students.remove({ _id: req.params.id }, (err, student) => {
        err ? res.send(err) : res.json(student);
    });
}


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

exports.findbyQuery = (req, res) => {
    Students.find({
        $or: [
            { name: new RegExp(req.params.name, 'i') },
            { subject: new RegExp(req.params.name, 'i') }
        ]
    }, (err, students) => {
        err ? res.send(err) : res.json(students);
    });
}