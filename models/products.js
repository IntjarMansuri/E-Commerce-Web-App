const mongoose = require('mongoose');
const Review = require('./review');

const productSchema = new mongoose.Schema ({
    brand: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        min: 0,
        default: 0,
    },
    mrp: {
        type: Number,
        min: 0,
    },
    category: {
        type: String,
        enum: ['mens', 'women', 'kids', 'beauty'],
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    avgRating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

productSchema.post('findOneAndDelete', async (product) => {
    // console.log(product);

    if(product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews }});
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;