const express = require("express");
const connectDB = require("./db/connect");

const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const itemsRouter = require("./routes/items");
app.use("/api/v1/items", itemsRouter);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();