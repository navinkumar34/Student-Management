const sequelize = require("sequelize");

const classDB = new sequelize(process.env.DB_KEY);
//This will make the connection to database and secret key has been stored in DB_KEY variable

classDB
  .authenticate()
  .then(() => {
    console.log("connection successful");
  })
  .catch(e => {
    console.error("connection failed!!");
    console.error(e);
  });
//This will tell if the authenication is succesful or failed

module.exports = classDB;
