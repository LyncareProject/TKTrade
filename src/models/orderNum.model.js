const mongoose = require("mongoose");

const ordernumSchema = new mongoose.Schema({
    mainOrder : { type: Number },
    subOrder: { type: Number },
    productOrder: { type: Number },
})

const orderNum = mongoose.model("number", ordernumSchema);

module.exports = orderNum;