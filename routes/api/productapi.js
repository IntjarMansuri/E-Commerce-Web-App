const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../../middleware');
const User = require('../../models/user');

router.post('/products/:productId/like', isLoggedIn, async (req, res) => {
    try {
        const { productId } = req.params;
        const user = req.user;

        const isLiked = user.wishlist.includes(productId);

        if (isLiked) {
            await User.findByIdAndUpdate(user._id, { $pull: { wishlist: productId } });
            res.json({ success: true, liked: false });
        } else {
            await User.findByIdAndUpdate(user._id, { $addToSet: { wishlist: productId } });
            res.json({ success: true, liked: true });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ success: false, e: 'An error occurred.' });
    }
});

module.exports = router;

