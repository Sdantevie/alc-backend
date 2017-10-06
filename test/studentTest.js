'use strict';

process.env.NODE_ENV = 'test';

const mongoose = require('mongoose'),
    Students = require('../app/models/studentModel.js');

//Test Dependencies

const chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../index.js'),
    should = chai.should();

chai.use(chaiHttp);

describe('Students', () => {
    beforeEach((done) => { //Before each test we empty the database
        Students.remove({}, (err) => {
            done();
        });
    });


    describe('GET students', () => {
        it('it should GET all Students', (done) => {
            chai.request(server)
                .get('/students')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });


    describe('GET student', () => {
        it('it should get a Particular student', done => {
            let student = new Students({
                firstName: 'Abiola',
                lastName: 'Olawale'
            });
            student.save((err, data) => {
                chai.request(server)
                    .get('/students/' + student.id)
                    .send(student)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstName').eql('Abiola');
                        res.body.should.have.property('lastName').eql('Olawale');
                        res.body.should.have.property('_id').eql(student.id);
                        done();
                    });
            });
        });
    });


    describe('POST students', () => {
        it('it should not post a Student without firstName', done => {
            let student = {
                lastName: "Olawale"
            };
            chai.request(server)
                .post('/students')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.errors.should.have.property('firstName');
                    res.body.errors.firstName.should.have.property('kind').eql('required');
                    done();
                });
        });
    });


    describe('POST students', () => {
        it('it should not post a Student without lastName', done => {
            let student = {
                firstName: "Olawale"
            };
            chai.request(server)
                .post('/students')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.errors.should.have.property('lastName');
                    res.body.errors.lastName.should.have.property('kind').eql('required');
                    done();
                });
        });
    });


    describe('POST students', () => {
        it('it should post a Student', done => {
            let student = {
                firstName: 'Abiola',
                lastName: 'Olawale'
            };
            chai.request(server)
                .post('/students')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql('Abiola');
                    res.body.should.have.property('lastName').eql('Olawale');
                    done();
                });
        });
    });

    describe('PUT student', () => {
        it('it should update a Particular student', done => {
            let student = new Students({
                firstName: 'Abiola',
                lastName: 'Olawale'
            });
            let studentBody = {
                firstName: 'Munawarrah',
                lastName: 'Olawale'
            };
            student.save((err, data) => {
                chai.request(server)
                    .put('/students/' + student.id)
                    .send(studentBody)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstName').eql('Munawarrah');
                        res.body.should.have.property('lastName').eql('Olawale');
                        done();
                    });
            });
        });
    });

    describe('DELETE student', () => {
        it('it should update a Particular student', done => {
            let student = new Students({
                firstName: 'Abiola',
                lastName: 'Olawale'
            });
            student.save((err, data) => {
                chai.request(server)
                    .delete('/students/' + student.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('ok');
                        res.body.should.have.property('n');
                        done();
                    });
            });
        });
    });
});