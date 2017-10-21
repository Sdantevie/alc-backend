'use strict';

const student = require('../controllers/studentController.js');

const routes = (app) => {
    app.route('/students').get(student.getStudents).post(student.postStudent);
    app.route('/students/:id').put(student.updateStudent).delete(student.deleteStudent);
    app.route('/api/authenticate').post(student.authenticate);
    app.route('/students/get/:name').get(student.getStudentByName);
    app.route('/students/getone/:name').get(student.findbyQuery);
}

module.exports = routes;