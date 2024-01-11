const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = () => {
  return mongoose.connect("mongodb+srv://marcomongo:mongomarco@marcosclusterno1.kzoqh.mongodb.net/shit?retryWrites=true&w=majority", {}, console.log("connected to mongodb atlas"));
};

module.exports = connectDB;