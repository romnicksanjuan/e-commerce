const mongoose = require('mongoose')


const variantSchema = mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    color: { type: String, required: true },
    image: {
        data: {
            type: Buffer,
            required: true
        },
        contentType: {
            type: String,
            required: true
        }
    },
    sizes: [[{
        size: { type: String, required: true },
        stock: { type: Number, required: true },
    }]],
})
module.exports = mongoose.model('Variant', variantSchema)