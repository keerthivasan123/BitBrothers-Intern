var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require("../controllers/user.js");

router.post(
  "/users",
  [
    check("username", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  createUser
);

router.get(
    "/users",
    getAllUsers
)

router.get(
  "/users/:id",
  getUserById
)

router.put(
  "/users/:id",
  updateUserById
)

router.delete(
  "/users/:id",
  deleteUserById
)

module.exports = router;