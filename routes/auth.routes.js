const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/auth.controller");

/**
http://localhost:3001/api/v1/auth/login
 */
authRouter.post("/login", authController.login);

module.exports = authRouter;
