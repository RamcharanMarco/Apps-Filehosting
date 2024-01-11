const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, "fileupload", { expiresIn: "300d" });
};

//post user
const createUser = async (req, res) => {
  const { email, password } = req.body;

  if (email) {
    try {
      if (!email || !password) {
        throw Error("all fields must be filled");
      }

      const emailexists = await User.findOne({ email });

      if (emailexists) {
        throw Error("email or username already exists");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const user = await User.create({ email, password: hash });

      const token = createToken(user._id);

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

//signin user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw Error("all fields must be filled");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw Error("email exists");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("incorrect password");
    }

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
