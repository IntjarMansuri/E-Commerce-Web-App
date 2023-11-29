const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware');

router.get('/products', productController.getAllProducts);

router.get('/products/mens', productController.getProductsByCategory('mens'));

router.get('/products/women', productController.getProductsByCategory('women'));

router.get('/products/kids', productController.getProductsByCategory('kids'));

router.get('/products/beauty', productController.getProductsByCategory('beauty'));

router.get('/products/new', isLoggedIn, isSeller ,productController.newProduct);

router.post('/products', isLoggedIn, isSeller, validateProduct, productController.addProduct);

router.get('/products/:id', productController.showProduct);

router.get('/products/:id/edit', isLoggedIn, isSeller, isProductAuthor,productController.editProduct);

router.patch('/products/:id', isLoggedIn, isSeller, isProductAuthor ,productController.updateProduct);

router.delete('/products/:id', isLoggedIn, isSeller, isProductAuthor,productController.deleteProduct);

module.exports = router;