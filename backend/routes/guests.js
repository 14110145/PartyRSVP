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

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: "Guest not found." });
    }
    await Guest.findOneAndRemove(req.params.id);
    res.send("Guest removed.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { name, dietary, phone, isconfirmed } = req.body;
  const updateGuest = { name, dietary, phone, isconfirmed };
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: "Guest not found." });
    }
    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: updateGuest },
      { new: true }
    );
    res.send(guest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
