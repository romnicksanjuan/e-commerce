const express = require('express')
const productRouter = express.Router()
const { createProduct, getAllProduct, getProductDetails, Test, addToCart, getCart,
    searchProduct, deleteCart } = require('../controller/product-controller')
const multer = require('multer');
const authMiddleware = require('../auth/auth.js')


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


productRouter.post('/create-product', upload.fields([
    { name: 'image', maxCount: 1 }, // Single profile image
    { name: 'images', maxCount: 10 },
    { name: 'variantImage', maxCount: 10 }
]), createProduct)

productRouter.get('/get-all-product', authMiddleware, getAllProduct)
productRouter.get('/product-details/:id', getProductDetails)
productRouter.get('/test', authMiddleware, Test)
productRouter.post('/add-item-to-cart', authMiddleware, addToCart)
productRouter.get('/cart', authMiddleware, getCart)
productRouter.get('/search', searchProduct)
productRouter.delete('/delete-cart/:id', deleteCart)

module.exports = productRouter