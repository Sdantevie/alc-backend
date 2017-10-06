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


    describe('/GET students', () => {
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
});