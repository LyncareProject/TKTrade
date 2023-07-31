const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;
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
    const { _id } = req.body
    await Product.findOne({ _id })
        .then(result => res.json(result))
        .catch(err => console.log(err.message))
}

exports.update = async (req, res) => {
    const { _id } = req.body
    await Product.findOneAndUpdate({ _id }, req.body)        
        .then(result => res.json({message : "Success"}))
        .catch(err => console.log(err.message))
}

exports.delete = async (req, res) => {
    const _id = req.params.id
    await Product.deleteOne({ _id })
        .then(result => res.json({ message : "Success" }))
        .catch(err => console.log(err.message))
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