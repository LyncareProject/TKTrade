const mongoose = require("mongoose");
const moment = require("moment");

const subcategorySchema = new mongoose.Schema({
    category : { type: String, required: true },
    subcategory : { type: String },
    order : { type: Number }
})

const Subcategory = mongoose.model("subcategory", subcategorySchema);

module.exports = Subcategory;