"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const userNewSchema = require("../schemas/userNew.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userAuthSchema, {
      required: true
    });
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    console.log("token created successfully:", token, "user is =", user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register:   user => { token }
 * user must include { username, password, firstName, lastName, email, etc }
 * Returns JWT token which can be used to authenticate further requests.
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  // console.log("req.body is:", req.body);

  try {
    // console.log("Started registration process", req.body);
    const validator = jsonschema.validate(req.body, userRegisterSchema, {
      required: true
    });
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const newUser = await User.register({
      ...req.body,
      isAdmin: false
    });
    console.log("User registered successfully:", newUser.username);
    const token = createToken(newUser);
    return res.status(201).json({
      token
    });
  } catch (err) {
    console.log("Error registering user:", err);
    return next(err);
  }
});

module.exports = router;
