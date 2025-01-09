const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/routes.js')
const productRouter = require('./routes/product-router.js')
const app = express()


const MOGNG_DB = 'mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/e-commerce'

mongoose.connect(MOGNG_DB)
    .then(() => {
        console.log('connected to database')
    })
    .catch((err) => console.log(err))


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the React app (Vite default port)
    methods: ['GET', 'POST','PUT','DELETE'],       // Allow specific HTTP methods
    credentials: true,
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/', router)
app.use('/', productRouter)


app.listen(3000, () => {
    console.log('server is running')
})