const express = require("express");
const router = express.Router();
const {
  deleteUser
} = require("../controllers/userController");
const Auth = require('../middlewear/requireAuth')
router.use(Auth);


//delete single user
router.delete("/:id", deleteUser);

module.exports = router;
