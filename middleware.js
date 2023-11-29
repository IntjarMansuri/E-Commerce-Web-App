const Product = require('./models/products');
const { productSchema, reviewSchema } = require('./schemas');

module.exports.validateProduct = (req, res, next) => {
    const { brand, image, price, mrp, category, description } = req.body;
    const { error } = productSchema.validate({ brand, image, price, mrp, category, description });

    if(error) {
        // console.log(error.details.message);
        const msg = error.details.map((err) => err.message).join(',');

        return res.render('products/error', { err: msg });
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { rating, comment } = req.body;
    const { error } = reviewSchema.validate({ rating, comment });

    if(error) {
        const msg = error.details.map((err) => err.message).join(',');
        return res.render('products/error', { err: msg });
    }
    next();
};

module.exports.isLoggedIn = (req, res, next) => {
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({
            msg:'Please Login first'
        })
    }

    if(!req.isAuthenticated()){
        req.flash('reject', 'You need to login first');
        return res.redirect('/login');
    }
    next();
};

module.exports.isSeller = (req, res, next) => {
    if(req.user.role === 'buyer') {
        req. flash('error', 'You are not authorised to do that!!');

        return res.redirect('back');
    }
    next();
};

module.exports.isProductAuthor = async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if(!product.author || !product.author.equals(req.user._id)) {
        req.flash('error', 'You are not auhtorised to do that!!');
        return res.redirect('back');
    }
    next();
};