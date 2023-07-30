const db = require("../models");

const { product : Product } = db;

exports.create = async (req, res) => {
    const product = new Product(req.body)
    await product.save()
        .then(()=> {
            res.status(200).json({ message : "Success"})
        })
        .catch(err => res.json(err))
}
exports.read = async (req, res) => {

}
exports.update = async (req, res) => {

}
exports.delete = async (req, res) => {

}
exports.findAll = async (req, res) => {
    await Product.find()
        .then(result =>{
            return res.status(200).json(result)
        })
        .catch((err)=>{
            return res.json(err)
        })
}