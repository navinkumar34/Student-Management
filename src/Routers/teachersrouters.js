const express = require("express");
const teachers = require("../Models/teachers.js");
const Teacher = require("../Models/teachersModel");
const teachersrouter = express.Router();

teachersrouter
  .get("/", (req, res) => {
    try {
      res.status(200).json({ teachers });
    } catch (error) {
      res.status(400).send("Incorrect URL");
    }
  })
  .get("/:id", (req, res) => {
    try {
      const teacher = teachers.find(
        teacher => teacher.id === parseInt(req.params.id)
      );
      if (teacher) {
        res.status(200).json({ teacher });
      } else {
        res.status(400).send("Teacher not found");
      }
    } catch (error) {
      res.status(400).send("Incorrect URL");
    }
  })
  .post("/", async (req, res) => {
    try {
      if (req.body.firstName) {
        const newTeacher = {
          ...req.body
        };
        const createTeacher = await Teacher.create(newTeacher);
        res.status(200).json({
          teacher: createTeacher
        });
      } else {
        res.status(400).send("Invalid Teacher");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  })
  .patch("/:id", async (req, res) => {
    try {
      const requiredTeacher = await Teacher.findByPk(parseInt(req.params.id));
      let teacher = requiredTeacher.get();
      teacher = {
        ...teacher,
        ...req.body
      };
      const updateResult = await requiredTeacher.update(teacher);
      res.status(200).json({ teacher: updateResult.get() });
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  })
  .delete("/:id", (req, res) => {
    try {
      let teacherIndex = -1;
      for (let i = 0; i < teachers.length; i++) {
        if (teachers[i].id === parseInt(req.params.id)) {
          teacherIndex = i;
          break;
        }
      }
      if (teacherIndex !== -1) {
        teachers.splice(teacherIndex, 1);
        res.status(200).json({});
      } else {
        res.status(400).send("Teacher Not found");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });

module.exports = teachersrouter;
