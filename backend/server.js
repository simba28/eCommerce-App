import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express(); 

app.use(express.json())

app.get('/', ( req, res ) => {
    res.send("API is running...")
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

// below line is to mimic __dirname
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// to make the uploads folder static so that browser can
// access that
// __dirname points to current directory but not is case of ES syntax,
// in common js syntax only that is the 'require' one

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen( 
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))