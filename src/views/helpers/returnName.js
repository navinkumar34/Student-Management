// const Teacher = require("/sandbox/Models/teachersModel");
// const returnName = async id => {
//   const requiredTeacher = await Teacher.findByPk(parseInt(id));
//   const teacher = await requiredTeacher.get();
//   return teacher.firstName + " " + teacher.lastName;
// };
const returnName = (id, teacher) => {
  const Teacher = teacher.find(each => each.id === id);
  return Teacher.firstName + " " + Teacher.lastName;
};
module.exports = returnName;
