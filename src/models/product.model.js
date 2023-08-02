const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id : { type: String }, 
    nameEng : { type: String }, 
    name : { type: String }, 
    category : { type: String }, 
    category_2 : { type: String }, 
    content : { type: String }, 
    contentEng : { type: String }, 
    pdf : { type: String }, 
    images : { type: Array }, 
})

const Product = mongoose.model("product", productSchema);

module.exports = Product;