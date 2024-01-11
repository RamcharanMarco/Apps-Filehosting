const express = require("express");
const router = express.Router();
const {
  createBucket,
  deleteBucket,
  getBuckets,
  getBucket,
  editBucket
} = require("../controllers/bucketController");
const Auth = require('../middlewear/requireAuth')
router.use(Auth);

//get single employer
router.get("/:id", getBucket);

router.get("/user/:id", getBuckets);

//delete single user
router.delete("/:id", deleteBucket);

router.post("/:id", createBucket);

router.post("/edit/:id", editBucket);

module.exports = router;
