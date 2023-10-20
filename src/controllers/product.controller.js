const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;
const { category : Category, product : Product } = db;
const path = require('path');

exports.create = async (req, res) => {
    const product = new Product(req.body)
    await product.save()
        .then(()=> {
            res.status(200).json({ message : "Success"})
        })
        .catch(err => res.json(err))   

    // console.log(imagePaths)
    // return res.json({ message: 'Images uploaded successfully.', imagePaths });

    // const product = new Product(req.body)
    // await product.save()
    //     .then(()=> {
    //         res.status(200).json({ message : "Success"})
    //     })
    //     .catch(err => res.json(err))    
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
    try {
        const categoryResult = await Category.find().sort({order: 1})
        const product = []
    
        for(let step = 0; step < categoryResult.length; step++){
            const result = await Product.find({ category : categoryResult[step].category })
            product.push(...result)
        }
        res.status(200).json(product)
    } catch(error){
        res.json(err)
    }

    // DB에서 카테고리 전체를 가져오기 
    // DB 카테고리 명들을 순서대로 배열에 넣고
    // 배열 첫번째 부터 하나씩 Product.find()
}