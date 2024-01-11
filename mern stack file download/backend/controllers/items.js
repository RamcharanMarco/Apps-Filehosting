const Item = require("../models/Item");
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");

const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ items });
  } catch (error) {
    console.log(error);
  }
};

const addItem = asyncWrapper(async (req, res) => {
  const { name } = req.body;
  const file = req.file.path;
  const item = await Item.create({ name, file });
  res.status(201).json({ item });
});

const downloadFile = asyncWrapper(async (req, res) => {
  const filePath = `uploads/marco-eyes.html`;
  res.download(filePath);
});

module.exports = {
  getItems,
  addItem,
  downloadFile,
};