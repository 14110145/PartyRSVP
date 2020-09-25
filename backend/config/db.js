require("dotenv").config({ path: ".env" });

const mongoose = require("mongoose");

const url = process.env.URL;
const connectDB = async () => {
  try {
    console.log(url);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
