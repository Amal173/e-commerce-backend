const users = require('../models/userSchema')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose')

const getUser = asyncHandler(async (req, res) => {
    const user = await users.find()
    if (!user) {
        return res.status(404).json({ error: "the users is not found" })
    }
    res.status(200).json({ user })
})


const getCartProducts = asyncHandler(async (req, res) => {
    const id=req.params.id
    const productId =new mongoose.Types.ObjectId(id);
    const user = await users.aggregate( [
        {
            $match:{_id:productId}
        },
        {
          $lookup:
            {
              from: "products",
              localField: "cart.productId",
              foreignField: "_id",
              as: "cart_products"
            }
       }
     ] )
    if (!user) {
        return res.status(404).json({ error: "the users is not found" })
    }
    res.status(200).json({ user })
})


const getOneUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await users.findById(id)
    if (!user) {
        return res.status(404).json({ error: "the user is not found" })
    }
    res.status(200).json({ user })
})



const removeCartProduct = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;

    try {
        const user = await users.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "The user is not found" });
        }


        const productIdObject =new mongoose.Types.ObjectId(productId);


        await users.updateOne(
            { _id: userId },
            { $pull: { cart: { productId: productIdObject } } }
        );


        const updatedUser = await users.findById(userId);

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




const createUser = asyncHandler(async (req, res) => {
    const { username, password, email, phonenumber, cart } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!username || !password || !email || !phonenumber) {
        return res.status(400).json({ error: "all fiels are mandatory" })
    }
    try {
        const user = await users.create({ username, password: hashedPassword, email, phonenumber, cart })
        res.status(201).json({ user })
    } catch (error) {

        return res.status(500).json({ error: error.message })
    }
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed no user found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed password missmatch' });
        }
        const secretKey = process.env.SECRET_KEY;

        const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h',
        });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Login failed', err: error.message });
    }
})


const editUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, password, email, phonenumber, cart } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = req.params.id;
    const user = await users.findById(id)
    if (!user) {
        return res.status(404).json({ error: "invalid user id" })
    }
    if (!username || !password || !email || !phonenumber) {
        return res.status(500).json({ error: "all fiels are mandatory" })
    }
    const body = { username, password: hashedPassword, email, phonenumber, cart }
    try {
        const updateUser = await users.findByIdAndUpdate(
            id,
            body,
            { new: true }
        )
        res.status(200).json({ updateUser })
    } catch (error) {

        return res.status(500).json({ error: error.message })
    }
})


const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const user = await users.findByIdAndDelete(id)
        res.status(200).json({ user })
    } catch (error) {

        return res.status(500).json({ error: "error deleting user" })
    }
})


const AddCartUser = asyncHandler(async (req, res) => {
    try {
        const {id } = req.body;
        const userId = req.params.id;
        const productId =new mongoose.Types.ObjectId(id);
        const cart = await users.updateOne(
            { "_id": userId },  
            { $push: { "cart": { 'productId': productId } } }
        );
        res.status(200).json({ cart })
    } catch (error) {

        return res.status(500).json({ error: "error adding product to cart user", err: error.message })
    }
})




module.exports = { getUser, getOneUser, createUser, editUser, deleteUser, loginUser, AddCartUser,getCartProducts,removeCartProduct }