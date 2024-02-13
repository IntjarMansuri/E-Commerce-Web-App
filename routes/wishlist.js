const express = require("express");
const { isLoggedIn } = require("../middleware");
const User = require("../models/user");
const router = express.Router();

router.get("products/wishlist", isLoggedIn, async (req, res) => {
  try {
    const user = req.user;

    const wishlistItem = await User.findById(user._id).populate("wishlist");

    if (!wishlistItem) {
      return res
        .status(404)
        .json({ success: false, error: "Wishlist item not found." });
    }
    res.render("wishlist/wishlist", { wishlistItem });
  } catch (e) {
    res.render("error", { err: e.message });
    res.status(500).send("Error fetching products");
  }
});

module.exports = router;
