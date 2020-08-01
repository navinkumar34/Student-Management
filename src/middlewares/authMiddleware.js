const { validateToken } = require("../utils/jwtService");

const authMiddleware = (req, res, next) => {
  console.log("---------------------");
  console.log(req.cookies.jwt);
  console.log("---------------------");

  // get current url
  // if jwt is expired -> redirect to the homepage
  // if it's a protected url

  const jwtData = validateToken(req.cookies.jwt);
  if (jwtData) {
    req.admin = jwtData;
  }
  next();
};

module.exports = authMiddleware;