const Student = require("../Models/studentsModel");
const Teacher = require("../Models/teachersModel");

const studentData = [
  {
    firstName: "Arun",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  },
  {
    firstName: "Ram",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  },
  {
    firstName: "Ravi",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  },
  {
    firstName: "Magesh",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  },
  {
    firstName: "Suresh",
    lastName: "Kumar",
    age: 16,
    gender: "male"
  }
];

const teacher = {
  firstName: "Kshay",
  lastName: "Keshav",
  email: "test@gmail.com",
  subject: "english"
};

const DBSeeder = () => {
  let id;
  Teacher.sync({ force: true })
    .then(() => {
      return Teacher.create(teacher);
    })
    .then(teacherResult => {
      ({ id } = teacherResult.get());
      return Student.sync({ force: true });
    })
    .then(() => {
      studentData.forEach(student => {
        Student.create({
          ...student,
          teacherId: id
        })
          .then(result => {
            console.log(result.get());
          })
          .catch(console.error);
      });
    })
    .catch(console.error);
};
DBSeeder();

module.exports = DBSeeder;

// Teacher.sync({ force: true }) // if table is available
//   .then(() => {
//     Teacher.create(teacher)
//       .then(teacherResult => {
//         const { id } = teacherResult.get();
//         Student.sync({ force: true })
//           .then(() => {
//             studentData.forEach(student => {
//               Student.create({
//                 ...student,
//                 teacherId: id
//               })
//                 .then(result => {
//                   console.log(result.get());
//                 })
//                 .catch(console.error);
//             });
//           })
//           .catch(console.error);
//       })
//       .catch(console.error);
//   })
//   .catch(console.error);
