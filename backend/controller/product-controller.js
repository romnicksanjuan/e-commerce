const mongoose = require('mongoose');
const Product = require('../model/product-model.js')
const User = require('../model/user-model.js');
const Cart = require('../model/cart-model.js')
const Variant = require('../model/product-variant.model.js');


const createProduct = async (req, res) => {
    const product = { ...req.body }

    console.log(product)


    const variantColors = product.variantColor; // Parse the JSON array

    // Map through each item and extract the color field
    const colors = variantColors.map(item => JSON.parse(item));
    const variantImage = req.files.variantImage


    colors.forEach((element, index) => {
        element.image = {
            data: variantImage[index].buffer,
            contentType: variantImage[index].mimetype
        }
    });

    console.log('variantImage:', variantImage)
    console.log('Received Colors:', colors);

    const images = req.files.images.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
    }));

    try {
        const author = await User.findById(new mongoose.Types.ObjectId(product.authorId));
        if (!author) {
            return res.status(400).json({ error: 'Author not found' });
        }

        const newProduct = new Product({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            images: images,
            author: new mongoose.Types.ObjectId(product.authorId)
        })

        const savedProduct = await newProduct.save()

        if (savedProduct) {
            const addVariant = colors.map((v, i) => ({
                product_id: newProduct._id,
                color: v.color,
                sizes: v.sizes,
                image: v.image
            }))
            const newvariant = await Variant.insertMany(addVariant)
            // console.log('newvariant:', newvariant.map(i => i._id))
            // console.log('addvariant:', addVariant)


            if (newvariant) {
                newProduct.variants.push(...newvariant.map(variant => variant._id));

                // Save the product with updated variants
                await newProduct.save();
            }
        }








        // console.log(savedProduct)

        // const p = newvariant.map(i => i._id)
        // newProduct.variants.push(new mongoose.Types.ObjectId(...p));
        // await newProduct.save();

    } catch (error) {
        console.log(error)
    }
}

const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find({}).populate('variants')
        console.log(product)

        const imageBuffer = product.map((p, index) => {
            const convert = p.images[0].data.toString('base64')
            const imageSrc = `data:${p.images[0].contentType};base64,${convert}`;
            // console.log(imageSrc)

            return imageSrc
        })

        // console.log(imageBuffer)
        // buffer: image.data,
        // contentType: image.contentType


        // console.log(imageBuffer[0].map(image => ({})))
        // const con = imageBuffer[0].map(image => {
        //     const convert = image.buffer.toString('base64')
        //     const imageSrc = `data:${image.contentType};base64,${convert}`;


        //     return imageSrc
        // })
        // console.log(con)

        // const convert = l.buffer.toString('base64')
        // const image = `data:${l.contentType};base64,${convert}`;


        res.json({ product: product, img: imageBuffer })
    } catch (error) {
        console.log(error)
    }
}

const getProductDetails = async (req, res) => {
    const { id } = req.params;
    try {

        // const variant = await Variant.find().populate('product_id').exec()


        // console.log('v', variant)
        const getProduct = await Product.findById(id).populate('variants').exec()

        if (!getProduct) {
            return res.status(400).json('item not found')
        }

        console.log(getProduct)

        const productImage = getProduct.variants.map((image) => (
            {
                buffer: image.image.data,
                contentType: image.image.contentType
            }
        ))

        console.log('variant image', productImage)
        const variantbase64 = productImage.map((img) => {
            const convert = img.buffer.toString('base64')
            const image = `data:${img.contentType};base64,${convert}`;
            return image
        });
        console.log('iiiiiiiiii', variantbase64)

        const imageBuffer = getProduct.images.map(image => ({
            buffer: image.data,
            contentType: image.contentType
        }));
        const base64Image = imageBuffer[0].buffer.toString('base64');
        const imageSrc = `data:${imageBuffer[0].contentType};base64,${base64Image}`;



        res.status(200).json({ item: getProduct, image: imageSrc, productImage: variantbase64 })
    } catch (error) {
        console.log(error)
    }
}




const Test = async (req, res) => {
    const id = [
        { id: '6778911f25b75d225d980be5' },
        { id: '67789162fe9d37dd5ef55b60' }
    ]

    const objectIds = id.map(id => new mongoose.Types.ObjectId(id));

    const results = await Product.find({ _id: { $in: objectIds } })

    console.log(results.map(item => item.title));
}

const addToCart = async (req, res) => {
    const { productId, variantId, quantity, sizeId } = req.body
    console.log(req.body)
    const userId = '6775518d6b56f2315dd50c59'
    const product = await Product.findOne({
        'variants': variantId
    });

    console.log('p', product)

    const cart = await Cart.findOne({ user_id: userId })


    const addNewCart = new Cart({
        user_id: userId,
        items: [{ product_id: productId, variant_id: variantId, quantity: quantity, sizeId: sizeId, price: product.price }]
    })

    const saveCart = await addNewCart.save()
    // console.log('cart saved successfully:', saveCart)
}


const getCart = async (req, res) => {
    try {
        const cart = await Cart.find()
            .populate('items.product_id')
            .populate('items.variant_id')
            .exec()  // Populate the variant_id field in items array


        const c = cart.map((c) => {
            c
        })
        // console.log(cart.map(c => (c.items.map(i => i.variant_id))))

        const image = cart.map(c => (c.items.map(i => ({
            buffer: i.variant_id.image.data,
            contentType: i.variant_id.image.contentType
        }))))
        // console.log('image', image)

        const base64 = image.map((img) => {
            return img.map(i => {
                const base64Image = i.buffer.toString('base64')
                const imageSrc = `data:${i.contentType};base64,${base64Image}`;

                return imageSrc
            })
        })

        // console.log('base', base64)

        res.status(200).json({ cart: cart, image: base64 })

    } catch (error) {
        console.log(error)
    }
}

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q; // Search keyword from the query parameter
        const products = await Product.find({
            title: { $regex: query, $options: 'i' }, // Case-insensitive partial match
        }).populate('variants');


        const imageBuffer = products.map((p, index) => {
            const convert = p.images[0].data.toString('base64')
            const imageSrc = `data:${p.images[0].contentType};base64,${convert}`;
            // console.log(imageSrc)

            return imageSrc
        })

        // console.log(imageBuffer)

        // console.log('result',products)
        res.json({products:products, img: imageBuffer});
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = { createProduct, getAllProduct, getProductDetails, Test, addToCart, getCart,searchProduct }