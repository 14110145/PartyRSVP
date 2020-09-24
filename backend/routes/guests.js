const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
// Guest model
const Guest = require("../models/Guest");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id });
    res.json(guests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

router.post(
  "/",
  authMiddleware,
  [
    check("name", "Please provide name").not().isEmpty(),
    check("phone", "Please provide phone").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, phone, dietary, isconfirmed } = req.body;

    try {
      let newGuest = new Guest({
        user: req.user.id,
        name,
        phone,
        dietary,
        isconfirmed,
      });
      newGuest = await newGuest.save();
      res.json(newGuest);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error.");
    }
  }
);

module.exports = router;
