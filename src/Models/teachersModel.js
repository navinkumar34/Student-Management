const sequelize = require("sequelize");
const classDb = require("../config/dbConfig");
//importing configuration file

//defining table
const Teacher = classDb.define("teachers", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
  email: {
    type: sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  class: sequelize.STRING, // no constraint
  subject: {
    type: sequelize.ENUM,
    values: ["english", "maths", "physics"],
    allowNull: false
  }
});

module.exports = Teacher;