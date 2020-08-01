const Admin = require("../Models/AdminModel");

const admin = {
  email: "test@gmail.com",
  password: "password!"
};

Admin.sync({ force: true })
  .then(() => {
    return Admin.create(admin);
  })
  .then(result => {
    console.log(result.get());
  })
  .catch(console.error);
