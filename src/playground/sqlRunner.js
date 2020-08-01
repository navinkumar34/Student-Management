const Student = require("../Models/studentsModel");

const Akshay = {
  firstName: "Akshay",
  lastName: "akash",
  age: 15,
  gender: "male"
};

//sync() function will check if table is there in database  or not, if not there it will create the table
Student.sync()
  .then(() => {
    Student.create(Akshay)
      .then(result => {
        console.log(result.get());
      })
      .catch(e => {
        console.error(e);
      });
  })
  .catch(e => {
    console.error(e);
  });
//This will simply insert the value in table
