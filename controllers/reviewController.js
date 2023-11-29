const Product = require('../models/products');
const Review = require('../models/review');

module.exports.createReviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const newReview = new Review(req.body);
        await newReview.save();
        // console.log(req.body);

        const product = await Product.findById(productId);
        const newAvgRating = ((product.avgRating * product.reviews.length)+parseInt(req.body.rating)) / (product.reviews.length+1);
        product.avgRating = parseFloat(newAvgRating.toFixed(1));

        product.reviews.push(newReview);

        await product.save(); 
        await newReview.save();

        // res.send('Comment Posted Succesfully');
        res.redirect('back');
    } catch (e) {
        res.render('error', { err: e.message });
    }
};