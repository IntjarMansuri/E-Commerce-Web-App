const mongoose = require('mongoose');
const Product = require('./models/products');

mongoose.connect('mongodb://127.0.0.1:27017/eshop')
    .then(() => {console.log('DB Connected!!!')})
    .catch(e => console.log(e));

const dummyProducts = [
    {
        brand: 'Amazon Brand - Symbol',
        image: 'https://m.media-amazon.com/images/I/713n+TxyfCL._AC_UL600_FMwebp_QL65_.jpg',
        price: 378,
        mrp: 420,
        category: 'mens',
        description: 'Men Regular Fit Polo Shirt'
    },
    {
        brand: 'LEOTUDE',
        image: 'https://m.media-amazon.com/images/I/61iKv6-unXL._AC_UL600_FMwebp_QL65_.jpg',
        price: 450,
        mrp: 550,
        category: 'women',
        description: 'Women Casual Printed Short Sleeve with Round Neck, Oversized Longline Drop Shoulder, Very Trendy Printed, Boho Style T-Shirt'
    },
    {
        brand: 'RodZen',
        image: 'https://m.media-amazon.com/images/I/71RshCYtnCL._AC_UL600_FMwebp_QL65_.jpg',
        price: 378,
        mrp: 460,
        category: 'women',
        description: 'Women Regular Fit Denim Shorts'
    },
    {
        brand: 'Lymio',
        image: 'https://m.media-amazon.com/images/I/71MaGTXl7ML._AC_UL600_FMwebp_QL65_.jpg',
        price: 349,
        mrp: 415,
        category: 'mens',
        description: 'Casual Shirt for Men|| Shirt for Men|| Men Stylish Shirt || Men Printed Shirt'
    },
    {
        brand: 'Dermawear',
        image: 'https://m.media-amazon.com/images/I/51U+avPfqKL._AC_UL600_FMwebp_QL65_.jpg',
        price: 760,
        mrp: 850,
        category: 'women',
        description: 'Womens Skinny Fit Micro Poly, Elastane Cotton Leggings'
    },
    {
        brand: 'SWISSTONE',
        image: 'https://m.media-amazon.com/images/I/817iC5Eq49L._AC_UL600_FMwebp_QL65_.jpg',
        price: 329,
        mrp: 390,
        category: 'women',
        description: 'Analog Womens Watch (Pink Dial Silver Colored Strap)'
    },
    {
        brand: 'Layfuz',
        image: 'https://m.media-amazon.com/images/I/61QXc22Tm1L._AC_UL600_FMwebp_QL65_.jpg',
        price: 1200,
        mrp: 2400,
        category: 'kids',
        description: 'Baby Boy Long Sleeves Suit for Autumn Printed Bear Clo ES and Long Plaid Trousers Clo ing for Baby Boys Toddlers Kids 1 to 3'
    },
    {
        brand: 'BRANDONN',
        image: 'https://m.media-amazon.com/images/I/61kqhTCKtgL._AC_UL600_FMwebp_QL65_.jpg',
        price: 664,
        mrp: 748,
        category: 'kids',
        description: 'BRANDONN Unisex Baby Flannel Jumpsuit Panda Style Cosplay Clothes Bunting Outfits Snowsuit Hooded Romper Outwear (Grey Scars, 9-12 Months)'
    },
    {
        brand: 'Lipstic',
        image: 'https://m.media-amazon.com/images/I/61qE6RDGH4L._AC_UL600_FMwebp_QL65_.jpg',
        price: 330,
        mrp: 399,
        category: 'beauty',
        description: 'Mamaearth Soft Matte Long Stay Lipsticks with Jojoba Oil & Vitamin E for 12 Hour Long Stay - 04 Berry Nude - 3.5 g'
    },
    
];

async function seedDB() {
    await Product.deleteMany({});
    await Product.insertMany(dummyProducts);
    console.log('DB seeded')
}
seedDB() 