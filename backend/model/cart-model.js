const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        variant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        sizeId: { type: String, required: true }
    }],
    total_price: { type: Number, required: true, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

CartSchema.pre('save', function (next) {
    // Calculate total_price before saving
    this.total_price = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    next();
});




module.exports = mongoose.model('carts', CartSchema)