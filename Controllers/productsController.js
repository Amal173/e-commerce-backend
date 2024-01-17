const product = require('../models/productSchema');
const asyncHandler = require('express-async-handler')


const getProducts = asyncHandler(async (req, res) => {
    const { id } = req.query;
    console.log(id);
    const products = await product.aggregate([{ $match: { categoryId: id ,isDeleted:false} }]);
    if (!products) {

        res.status(500).json({ message: "error to get the data" });
    }
    res.status(200).json({ products });
})



const getOneProduct = asyncHandler(async (req, res) => {
    const products = await product.findById(req.params.id);
    if (!products) {
        res.status(500).json({ message: " product not found" });
    }
    res.status(200).json({ products });
})



const createProduct = asyncHandler(async (req, res) => {

    const { productName, productSpecs, productDescription, productPrice, categoryId } = req.body
    console.log("files:", req.body);
    const imagepaths = req.files ? req.files.map(file => file.filename) : null;
    console.log(imagepaths, "==");
    if (!productName ||
        !productSpecs ||
        !productDescription ||
        !productPrice ||
        !categoryId
    ) {
        res.status(400);
        throw new Error("empty field");
    }

    try {
        const products = await product.create({
            productName,
            productSpecs,
            productDescription,
            productPrice,
            categoryId,
            productImages: imagepaths
        });

        res.status(201).json({ products });
    } catch (error) {
        res.status(500).json({ errorr: error.message });
    }
})



const editProduct = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { productName, productSpecs, productDescription, productPrice, categoryId } = req.body;
    const id = req.params.id;
    console.log(req.files);
    let imagepaths = req.files ? req.files.map(file => file.filename) : null;

    if (!productName || !productSpecs || !productDescription || !productPrice || !categoryId) {
        res.status(400);
        throw new Error("empty field");
    }


    if (!req.files) {
        const existingProduct = await product.findById(req.params.id);

        if (!existingProduct) {
            res.status(404);
            throw new Error("product not found");
        }

        imagepaths = existingProduct.productImages.map(file => file);
    }



    const updateData = {
        ...req.body,
        productImages: imagepaths
    };

    const products = await product.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
    );

    res.status(200).json({ products });
});


const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const products = await product.findByIdAndUpdate(  { _id:id} , { $set: { isDeleted : true  } });
    if (!products) {
        res.status(404);
        throw new Error("products not found");
    }
    res.status(200).json({ products });
})

module.exports = { getProducts, getOneProduct, createProduct, editProduct, deleteProduct }