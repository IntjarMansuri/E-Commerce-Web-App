const Product = require("../models/products");
const Review = require("../models/review");

module.exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products/index', { products });
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send('Error fetching products');
    }
};

module.exports.getProductsByCategory = (categoryMen) => async (req, res) => {
    try {
        const products = await Product.find({ category: categoryMen });
        res.render('products/mens', { category: categoryMen, products });
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send(`Error fetching ${categoryMen} products`);
    }
};

module.exports.getProductsByCategory = (categoryWomen) => async (req, res) => {
    try {
        const products = await Product.find({ category: categoryWomen });
        res.render('products/women', { category: categoryWomen, products });
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send(`Error fetching ${categoryWomen} products`);
    }
};

module.exports.getProductsByCategory = (categoryKids) => async (req, res) => {
    try {
        const products = await Product.find({ category: categoryKids });
        res.render('products/kids', { category: categoryKids, products });
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send(`Error fetching ${categoryKids} products`);
    }
};

module.exports.getProductsByCategory = (categoryBeauty) => async (req, res) => {
    try {
        const products = await Product.find({ category: categoryBeauty });
        res.render('products/beauty', { category: categoryBeauty, products });
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send(`Error fetching ${categoryBeauty} products`);
    }
};

module.exports.newProduct = async (req, res) => {
    try {
        res.render('products/new');
    } catch (e) {
        res.render('error', { err: e.message });
    }
};

module.exports.addProduct = async (req, res) => {
    try {
        await Product.create ({ ...req.body, author: req.user._id });
        req.flash('success', 'The product has been successfully added.')
        res.redirect('/products');
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send('Error fetching products');
    }
};

module.exports.showProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product =  await Product.findById(id).populate('reviews');
        res.render('products/show', { product });
    } catch(e) {
        res.render('error', { err: e.message });
        // res.status(500).send('Error fetching products');
    }
};

module.exports.editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', { product }); 
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send('Error fetching products');
    }
};

module.exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, req.body);
        req.flash('success', 'The product has been successfully Update');
        res.redirect(`/products/${ id }`);
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send('Error fetching products');
    }
};

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        req.flash('success', 'The product has been deleted');
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    } catch (e) {
        res.render('error', { err: e.message });
        res.status(500).send('Error fetching products');
    }
};

