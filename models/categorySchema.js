const mongoose = require('mongoose');


const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  categoryImage: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('category', categorySchema);