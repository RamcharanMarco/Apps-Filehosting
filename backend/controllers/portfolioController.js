const Portfolio = require("../models/portfolioModel");

//get bucket
const getPortfolio = async (req, res) => {
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
const createPortfolio = async (req, res) => {
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
const deletePortfolio = async (req, res) => {
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

const editPortfolio = async (req, res) => {
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
  getPortfolio,
  createPortfolio,
  deletePortfolio,
  editPortfolio
};
