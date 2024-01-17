const express = require('express');
const {connectDb}=require('./config/dbConnection');
const categoryRouter=require('./router/categoryRouter')
const adminRouter=require('./router/adminRouter')
const userRouter=require('./router/userRouter')
const stripePaymentRouter=require('./router/stripePaymentRouter')
const userOrderRouter=require('./router/userOrderRouter')
const productRouter=require('./router/productsRouter')
const cookieParser = require('cookie-parser')
const path=require('path')
require('dotenv').config();
const cors=require('cors')


const app = express();
const port=process.env.PORT
connectDb();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use('/categoryes',categoryRouter);
app.use('/products',productRouter);
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/stripe',stripePaymentRouter);
app.use('/stripe',userOrderRouter);
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.listen(port, () => {
    console.log(`Server Started at port ${port}`)
})