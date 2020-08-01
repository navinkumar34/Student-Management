const express = require("express");
const Admin = require("../Models/AdminModel");
const { compareHash } = require("../utils/hashingService");
const { createToken } = require("../utils/jwtService");

const adminrouter = express.Router();

adminrouter
  .get("/", (req, res) => {
    if (req.admin) {
      res.redirect("/");
      return;
    }
    res.render("adminLogin", {
      layout: "login",
      formTitle: "Admin Login",
      submitTarget: "/admin/login",
      submitMethod: "POST"
    });
  })
  .post("/login", async (req, res) => {
    if (req.admin) {
      res.redirect("/");
      return;
    }
    const { email, password } = req.body;
    const result = await Admin.findOne({
      where: {
        email
      }
    });
    if (!result) {
      res.status(400).send("Invalid User!");
    } else {
      const { password: passwordHash } = result.get();
      const comparisionResult = await compareHash(password, passwordHash);
      if (!comparisionResult) {
        res.status(400).send("Invalid User!");
      } else {
        const jwtToken = createToken({
          type: "admin",
          email
        });
        res.cookie("jwt", jwtToken, { httpOnly: true });
        //res.status(200).send("Valid User!");
        res.redirect("/");
      }
    }
  })
  .get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
  });

module.exports = adminrouter;
