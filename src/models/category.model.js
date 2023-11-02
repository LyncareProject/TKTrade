const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    category : { type: String, required: true, unique : true },
    images : { type: String },
})

const Category = mongoose.model("category", categorySchema);

module.exports = Category;