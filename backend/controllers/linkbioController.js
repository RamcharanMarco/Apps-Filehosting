const Linkbio = require("../models/linkbioModel");

//get bucket
const getLinkbio = async (req, res) => {
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
const createLinkbio = async (req, res) => {
  const user_id = req.user._id;
  const { name } = req.body;
  try {
    const bucket = await Bucket.create({ user_id, name });
    res.status(200).json(bucket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete bucket
const deleteLinkbio = async (req, res) => {
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

const editLinkbio = async (req, res) => {
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
  getLinkbio,
  createLinkbio,
  deleteLinkbio,
  editLinkbio
};
