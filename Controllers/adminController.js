const admins = require('../models/adminSchema')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAdmin = asyncHandler(async (req, res) => {
    const admin = await admins.find()
    if (!admin) {
        res.status(404).json({ error: "admin not found" })
    }
    res.status(200).json({ admin })
})

const getOneAdmin = asyncHandler(async (req, res) => {
    const admin = await admins.findById(req.params.id)
    if (!admin) {
        return res.status(404).json({ error: "admin not found" })
    }
    res.status(200).json({ admin })
})



const createAdmin = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { username, password, email, phonenumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!username || !password || !email || !phonenumber) {
        return res.status(400).json({ error: "all fields are mandatory" })
    }
    try {
        const admin = await admins.create({
            username,
            password:hashedPassword,
            email,
            phonenumber
        })
        res.status(201).json({ admin })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const admin = await admins.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Authentication failed due to admin not found' });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed due to password missmatch' });
        }
        const secretKey = process.env.SECRET_KEY;
       
        const token = jwt.sign({adminId:admin._id}, secretKey, {
            expiresIn: '1h',
        });
        res.status(200).cookie('authcookie',token,{httpOnly:true}) 
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' ,err:error.message});
    }
})




const deleteAdmin = asyncHandler(async (req, res) => {
    const admin = await admins.findByIdAndDelete(req.params.id)
    if (!admin) {
        res.status(404).json({ error: "admin not found" })
    }
    res.status(200).json({ deleted: admin })
})

const editAdmin = asyncHandler(async (req, res) => {
    const { username, password, email, phonenumber } = req.body
    const id = req.params.id
    const updateAdmin = await admins.findById(id)
    if (!updateAdmin) {
        return res.status(404).json({ error: "admin id is not found" })
    }
    if (!username || !password || !email || !phonenumber) {
        return res.status(400).json({ error: "all fields are mandatory" })
    }
    const body = { ...req.body }
    try {
        const admin = await admins.findByIdAndUpdate(
            id,
            body,
            { new: true })
        res.status(201).json({ admin })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


})

module.exports = { getAdmin, getOneAdmin, createAdmin, deleteAdmin, editAdmin,loginAdmin }