require("dotenv").config();
const express = require("express");
const studentrouter = require("./Routers/studentsrouter.js");
const teachersrouters = require("./Routers/teachersrouters.js");
const adminrouter = require("./Routers/adminrouters");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const compression = require('compression');
const helmet = require('helmet');
//const students = require("./Models/students.js");
//const teachers = require("./Models/teachers.js");
const formatIndex = require("./views/helpers/formatIndex");
const ifEquality = require("./views/helpers/ifEquality");
const setChecked = require("./views/helpers/setChecked");
const returnName = require("./views/helpers/returnName");
const setSelected = require("./views/helpers/setSelected");
const Student = require("./Models/studentsModel");
const Teacher = require("./Models/teachersModel");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    formatIndex,
    ifEquality,
    setChecked,
    returnName,
    setSelected
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieparser());
app.use(compression());
app.use(helmet());

app.use(authMiddleware);

// define which engines are present
app.engine(".hbs", hbs.engine);
// set default engine
app.set("view engine", ".hbs");
// let express know where all engines are present
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero",
    pageTitle: "Home",
    isAdminLoggedin: !!req.admin
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "hero",
    pageTitle: "About"
  });
});

// Students
app.get("/students", async (req, res) => {
  try {
    const studentsFromDB = await Student.findAll();
    const studentsArray = studentsFromDB.map(each => each.get());
    const teachersFromDB = await Teacher.findAll({
      attributes: ["id", "firstName", "lastName"]
    });
    const teacher = teachersFromDB.map(each => each.get());
    //console.log(teacher);

    res.render("student", {
      layout: "navigation",
      pageTitle: "Students",
      students: studentsArray,
      teacher
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error!");
  }
});

app.get("/add-student", async (req, res) => {
  try {
    const teachersFromDB = await Teacher.findAll({
      attributes: ["id", "firstName", "lastName"]
    });
    const teacher = teachersFromDB.map(each => each.get());
    res.render("add-students", {
      layout: "navigation",
      pageTitle: "Add Student",
      action: "/api/students",
      method: "POST",
      mode: "Add",
      teacher
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error!");
  }
});

app.get("/edit-student/:id", async (req, res) => {
  try {
    const requiredStudent = await Student.findByPk(parseInt(req.params.id));
    // const requiredStudent = await Student.findOne({
    //   where: {
    //     id: parseInt(req.params.id)
    //   }
    // });
    const student = requiredStudent.get();
    const teachersFromDB = await Teacher.findAll({
      attributes: ["id", "firstName", "lastName"]
    });
    const teacher = teachersFromDB.map(each => each.get());
    // console.log(teacher);
    res.render("edit-student", {
      layout: "navigation",
      pageTitle: "Edit Student : " + student.firstName,
      action: "/api/students/" + student.id,
      method: "PATCH",
      btnText: "Edit",
      student,
      teacher
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/delete-student/:id", async (req, res) => {
  try {
    const requiredStudent = await Student.findByPk(parseInt(req.params.id));

    const student = requiredStudent.get();

    if (student) {
      requiredStudent.destroy();
      res.redirect("/students");
    } else {
      res.status(400).send("Invalid Student");
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

//teachers
app.get("/teachers", async (req, res) => {
  if (req.admin) {
    // only let admins access the page
    try {
      const teachersFromDB = await Teacher.findAll();
      const teacher = teachersFromDB.map(each => each.get());
      res.render("teacher", {
        layout: "navigationT",
        pageTitle: "Teachers",
        teacher
      });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/add-teacher", async (req, res) => {
  if (req.admin) {
    try {
      res.render("add-teachers", {
        layout: "navigationT",
        pageTitle: "Add Teachers",
        action: "/api/teachers",
        method: "POST",
        mode: "Add"
      });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/");
  }
});

app.get("/edit-teacher/:id", async (req, res) => {
  if (req.admin) {
    const requiredTeacher = await Teacher.findByPk(parseInt(req.params.id));
    const teacher = requiredTeacher.get();
    res.render("edit-teachers", {
      layout: "navigationT",
      pageTitle: "Edit Teacher : " + teacher.firstName,
      action: "/api/teachers/" + teacher.id,
      method: "PATCH",
      mode: "Edit",
      teacher
    });
  } else {
    res.redirect("/");
  }
});

app.get("/delete-teacher/:id", async (req, res) => {
  if (req.admin) {
    try {
      const requiredTeacher = await Teacher.findByPk(parseInt(req.params.id));

      const teacher = requiredTeacher.get();

      if (teacher) {
        requiredTeacher.destroy();
        res.redirect("/teachers");
      } else {
        res.status(400).send("Invalid Teacher");
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/");
  }
});

app.use("/api/students", studentrouter);
app.use("/api/teachers", teachersrouters);
app.use("/admin", adminrouter);
app.listen(8080, () => console.log(" server running"));
