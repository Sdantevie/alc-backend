'use strict';

const student = require('../controllers/studentController.js');

const routes = (app) => {
    app.route('/students').get(student.getStudents).post(student.postStudent);
    app.route('/students/:id').get(student.getStudent).put(student.updateStudent).delete(student.deleteStudent);
}

module.exports = routes;