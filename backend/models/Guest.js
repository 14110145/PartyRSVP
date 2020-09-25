const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dietary: {
    type: String,
    default: "Non-vegan",
    required: true,
  },
  isconfirmed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = mongoose.model("guests", guestSchema);
