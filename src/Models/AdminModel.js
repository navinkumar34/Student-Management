const sequelize = require("sequelize");
const classDb = require("../config/dbConfig");
const { generateHash } = require("../utils/hashingService");

const Admin = classDb.define(
  "admin",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: sequelize.STRING,
      allowNull: false
    }
  },
  {
    setterMethods: {
      password(plainTextPassword) {
        this.setDataValue("password", generateHash(plainTextPassword));
      }
    }
  }
);

module.exports = Admin;
