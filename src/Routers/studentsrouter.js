const express = require("express");
const students = require("../Models/students.js");
const Student = require("../Models/studentsModel");

const studentsrouter = express.Router();

studentsrouter
  .get("/", (req, res) => {
    try {
      res.status(200).json({
        students
      });
    } catch (e) {
      res.status(400).send("Incorrect URL");
    }
  })
  .get("/:id", (req, res) => {
    try {
      const student = students.find(
        student => student.id === parseInt(req.params.id)
      );
      if (student) {
        res.status(200).json({ student });
      } else {
        res.status(400).send("Student not found");
      }
    } catch (e) {
      res.status(400).send("Incorrect URL");
    }
  })
  .post("/", async (req, res) => {
    try {
      if (req.body.firstName && parseInt(req.body.age) < 18) {
        const newStudent = {
          ...req.body
        };
        //console.log(newStudent);
        const createStudent = await Student.create(newStudent);
        res.status(200).json({
          student: createStudent
        });
      } else {
        res.status(400).send("Invalid Student");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  })
  .patch("/:id", async (req, res) => {
    try {
      const requiredStudent = await Student.findByPk(parseInt(req.params.id));
      let student = requiredStudent.get();
      student = {
        ...student,
        ...req.body
      };
      const updateResult = await requiredStudent.update(student);
      res.status(200).json({ student: updateResult.get() });
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })
  .delete("/:id", (req, res) => {
    try {
      let studentIndex = -1;
      for (let i = 0; i < students.length; i++) {
        if (students[i].id === parseInt(req.params.id)) {
          studentIndex = i;
          break;
        }
      }
      if (studentIndex !== -1) {
        students.splice(studentIndex, 1);
        res.status(200).json({});
      } else {
        res.status(400).send("Invalid Student");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = studentsrouter;
