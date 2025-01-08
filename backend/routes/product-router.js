const express = require('express')
const productRouter = express.Router()
const { createProduct, getAllProduct, getProductDetails, Test, addToCart,getCart } = require('../controller/product-controller')
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


productRouter.post('/create-product', upload.fields([
    { name: 'image', maxCount: 1 }, // Single profile image
    { name: 'images', maxCount: 10 },
    { name: 'variantImage', maxCount: 10 }
]),createProduct)

productRouter.get('/get-all-product', getAllProduct)
productRouter.get('/product-details/:id', getProductDetails)
productRouter.get('/test', Test)
productRouter.post('/add-item-to-cart', addToCart)
productRouter.get('/cart', getCart)

module.exports = productRouter