const Joi = require('joi');

module.exports.productSchema = Joi.object({
    brand: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.string().min(0).required(),
    mrp: Joi.string().min(0).required(),
    category: Joi.string().required(),
    description: Joi.string().required()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().min(0).max(5),
    comment: Joi.string().required(),
});