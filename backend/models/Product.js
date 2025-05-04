const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  price: Number,
  addedBy: String,
  wishlistId: mongoose.Schema.Types.ObjectId,
});
module.exports = mongoose.model('Product', ProductSchema);