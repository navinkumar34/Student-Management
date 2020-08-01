const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.generateHash = plainTextPassword => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

exports.compareHash = (plainTextPassword, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPassword, passwordHash, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
};

// const password = "Hello";

// console.log("Password - ", password);
// const hash = generateHash(password);
// console.log("Generated Hash - ", hash);

// compareHash(password, hash)
//   .then(result => {
//     console.log("passwords match - ", result);
//   })
//   .catch(console.error);
