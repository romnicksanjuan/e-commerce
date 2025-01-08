const mongoose = require('mongoose');
const Author = require('../model/user-model.js'); // Assuming your Author model is in the 'models' folder

// Define the product schema
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    }],
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        // required: true
    }
}, { timestamps: true });

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;