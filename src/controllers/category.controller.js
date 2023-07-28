const db = require("../models");

const { category : Category, subcategory : Subcategory } = db;

exports.readCategory = async (req, res) => {
    await Category.find()
        .then(result =>{
            return res.status(200).json(result)
        })
        .catch((err)=>{
            return res.json(err)
        })
}
exports.deleteCategory = async (req, res) => {
    await Category.deleteOne({ category : req.params.category })
        .then(()=>{
            res.status(200).json({ message : "Success"})
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.deleteSubcategory = async (req, res) => {
    const { category, subcategory } = req.body
    
    await Subcategory.deleteOne({ category, subcategory })
        .then(()=>{
            res.status(200).json({ message : "Success"})
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.createCategory = async (req, res) => {
    console.log(req.body)
    const category = new Category({
        category : req.body.category
    })
    await category.save()
        .then(()=> {
            console.log('category 생성')
            res.status(200).json({ message : "Success"})
        })
        .catch(err => res.json(err))
}
exports.readSubcategory = async (req, res) => {
    const { category } = req.body
    await Subcategory.find({ category : category })
        .then(result =>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
}
exports.createSubcategory = async (req, res) => {
    const subcategory = new Subcategory({
        category : req.body.category,
        subcategory : req.body.subcategory
    })
    await subcategory.save()
        .then(()=> {
            res.status(200).json({ message : "Success"})
        })
        .catch(err => res.json(err))
}
