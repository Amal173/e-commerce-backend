const category = require('../models/categorySchema');
const asyncHandler = require('express-async-handler')


const getCategory = asyncHandler(async (req, res) => {
  const categoryes = await category.aggregate([{ $match: { isDeleted: false } }]);
  if (!categoryes) {

    res.status(500).json({ message: "error to get the data" });
  }
  res.status(200).json({ categoryes });
});

//post category
const createCategory = asyncHandler(async (req, res) => {
  console.log("the request body is:", req.body);

  const { categoryName } = req.body;
  const imagepath = req.file ? req.file.filename : null
  console.log(imagepath);

  if (!categoryName) {
    res.status(400);
    throw new Error("empty field");
  }

  try {
    const newCategory = await category.create({
      categoryName,
      categoryImage: imagepath
    });

    res.status(201).json({ categoryes: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


});


//put category
const editCategory = asyncHandler(async (req, res) => {
  console.log("the request body is:", req.body);
  console.log("the request params is:", req.params.id);
const id=req.params.id;
  const { categoryName } = req.body;
  let imagepath = req.file ? req.file.filename : null
  console.log(imagepath);

  if (!categoryName) {
    res.status(400);
    throw new Error("empty field");
  }
  if (!req.file) {
    const existingCategory = await category.findById(req.params.id);

    if (!existingCategory) {
        res.status(404);
        throw new Error("category not found");
    }

    imagepath = existingCategory.categoryImage;
}

const updateData = {
  categoryName,
  categoryImage: imagepath,

};
  try {
    const editedCategory = await category.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
      
    );

    res.status(200).json({ categoryes: editedCategory });
  } catch (error) {
    res.status(500).json({ errorrrr: error.message });
  }


});



//get caterory by id
const getOneCategory = asyncHandler(async (req, res) => {
  const categoryes = await category.findById(req.params.id);
  if (!categoryes) {
    res.status(404);
    throw new Error("category not found");
  }
  res.status(200).json({ categoryes });
});


//delete caterory by id
const deleteCategory = asyncHandler(async (req, res) => {
  const id=req.params.id;
    const categorys = await category.findByIdAndUpdate(  { _id:id} , { $set: { isDeleted : true  } });
    if (!categorys) {
        res.status(404);
        throw new Error("category not found");
      }
    res.status(200).json({ categorys });
});

module.exports = { getCategory, getOneCategory, createCategory,deleteCategory,editCategory }