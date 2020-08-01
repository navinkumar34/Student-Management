const sequelize = require("sequelize");
const classDb = require("../config/dbConfig");
//importing configuration file
const Teacher = require("./teachersModel");
//defining table

const Student = classDb.define("students", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: sequelize.STRING,
    allowNull: false,
    field: "first_name"
  },
  lastName: {
    type: sequelize.STRING,
    allowNull: false,
    field: "last_name"
  },
  age: {
    type: sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 17
    }
  },
  gender: {
    type: sequelize.ENUM,
    values: ["male", "female"],
    allowNull: false
  },
  teacherId: {
    type: sequelize.INTEGER,
    field: "teacher_id",
    allowNull: false,
    references: {
      model: Teacher,
      key: "id",
      deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  }
});

module.exports = Student;
