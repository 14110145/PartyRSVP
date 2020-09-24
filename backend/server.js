const express = require("express");
const app = express();

const connectDB = require("./config/db");
// connect to database
connectDB();

app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is backend server...");
});

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
