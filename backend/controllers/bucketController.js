const User = require("../models/userModel");
const Bucket = require("../models/bucketModel");
const fs = require("fs");
let path = require('path');

//get bucket
const getBucket = async (req, res) => {
  const id = req.params.id;
  try {
    const bucket = await Bucket.findById(id);
    if (!bucket) {
      return res.status(400).json({ error: "no such bucket" });
    }
    res.status(200).json(bucket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create  bucket
const createBucket = async (req, res) => {
  const user_id = req.user._id;
  const { name } = req.body;
  try {
    const bucket = await Bucket.create({ user_id, name });
    res.status(200).json(bucket);
    createBucketFolder(bucket._id)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

let createBucketFolder = (id) =>{
  try {
    let p = path.join(__dirname+`/../files/${id}`)
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
        console.log('folder created')
      }
    } catch (err) {
      console.error(err);
      console.log('folder not created')
    }
}

//delete bucket
const deleteBucket = async (req, res) => {
  const id = req.params.id;
  try {
    const bucket = await Bucket.findByIdAndDelete(id);
    if (!bucket) {
      return res.status(400).json({ error: "no such bucket" });
    }
    res.status(200).json(bucket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get buckets for a user
const getBuckets = async (req, res) => {
  const id = req.params.id;
  try {
    const buckets = await Bucket.find({ user_id: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(buckets);
    console.log(buckets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const editBucket = async (req, res) => {
  const { name } = req.body;
  try{
    const bucket = await Bucket.findByIdAndUpdate(req.params.id,{name:name},{
      new : true,
      runValidators : true
    })
      res.status(200).json(bucket)
      console.log('bucket',bucket)
  }catch(error){
      console.log(error)
      res.status(400).json({error : error.message})
  }
}

module.exports = {
  getBucket,
  createBucket,
  deleteBucket,
  getBuckets,
  editBucket
};
