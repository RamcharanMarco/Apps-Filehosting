const User = require("../models/userModel");

//delete bucket
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ error: "no such bucket" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  deleteUser
};
