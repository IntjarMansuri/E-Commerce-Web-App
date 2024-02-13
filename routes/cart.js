const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const User = require("../models/user");

router.post("/user/:productId/add", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const cartItem = user.cart.find((item) => {
      return item.productId.toString() === productId;
    });

    if (cartItem) {
      cartItem.quantity++;
    } else {
      user.cart.push({ productId });
    }

    await user.save();

    req.flash("success", "Item added to cart successfully!");
    res.redirect("/user/cart");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to add item to cart");
    res.redirect("/user/cart");
  }
});

router.post("/user/:productId/remove", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const cartItem = user.cart.find((item) => {
      return item.productId.toString() === productId;
    });

    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    }

    await user.save();

    req.flash("success", "Item removed from cart successfully!");
    res.redirect("/user/cart");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to remove item from cart");
    res.redirect("/user/cart");
  }
});

router.delete("/user/:productId", isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    await User.findByIdAndUpdate(userId, {
      $pull: { cart: { productId } },
    });

    req.flash("success", "Item removed from cart successfully!");
    res.redirect("/user/cart");
  } catch (error) {
    console.error(error);
    req.flash("error", "Failed to remove item from cart");
    res.redirect("/user/cart");
  }
});

router.get("/user/cart", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("cart.productId");

    let totalAmount = 0;
    user.cart.forEach((item) => {
      totalAmount += item.quantity * item.productId.price;
    });

    res.render("cart/index", { user, totalAmount });
  } catch (error) {
    console.error(error);
    req.flash("error", "Error fetching cart");
    res.redirect("/user/cart");
  }
});

module.exports = router;
