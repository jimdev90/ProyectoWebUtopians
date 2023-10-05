const express = require('express');
const multiparty = require("connect-multiparty");
const CourseController = require("../controllers/course");
const middlewareAuth = require('../middleware/authenticated');
const middelwareUpload = multiparty({ uploadDir: 'uploads/course'});


const api = express.Router();

api.post("/course",[middlewareAuth.asureAuth, middelwareUpload],CourseController.createCourse);
api.get("/course", CourseController.getCourse);
api.patch("/course/:id",[middlewareAuth.asureAuth, middelwareUpload],CourseController.updateCourse);
api.delete("/course/:id", [middlewareAuth.asureAuth], CourseController.deleteCourse);

module.exports = api;