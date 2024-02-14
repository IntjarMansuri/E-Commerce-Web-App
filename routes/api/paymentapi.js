const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { isLoggedIn } = require("../../middleware");
const Order = require("../../models/order");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

router.post("/order", isLoggedIn, async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });

    const { amount } = req.body;

    if (isNaN(parseInt(amount))) {
      return res.status(400).json({
        success: false,
        error: "The amount field should be a valid number.",
      });
    }

    const options = {
      amount: parseInt(amount) * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    await Order.create({
      _id: order.id,
      user: req.user._id,
      amount,
    });

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
});

router.post("/payment-verify", async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const isValid = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      RAZORPAY_KEY_SECRET
    );

    if (isValid) {
      await Order.findByIdAndUpdate(
        { _id: razorpay_order_id },
        { paymentStatus: true }
      );
      res.json({ success: true, msg: "Payment Successful" });
    } else {
      res.json({ success: false, msg: "Not a valid payment!" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: "Failed to verify payment" });
  }
});

module.exports = router;
