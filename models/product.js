const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: false 
  },
  images: {
    type: [String],
    required: false 
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  technicalSpecs: {
    type: Object,
    required: false 
  },
  isDeleted : {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: false
  }
});

module.exports = mongoose.model('Product', productSchema);
