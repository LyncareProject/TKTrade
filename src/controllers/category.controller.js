const db = require("../models");

const { category : Category, subcategory : Subcategory, orderNum : OrderNum} = db;

exports.readCategory = async (req, res) => {
    await Category.find().sort({ order: 1 })
        .then(result =>{
            return res.status(200).json(result)
        })
        .catch((err)=>{
            return res.json(err)
        })
}

exports.deleteCategory = async (req, res) => {
    const category = req.params.category
    await Category.deleteOne({ category }).then(()=>{
        Subcategory.deleteMany({ category })
            .then(result => res.status(200).json({ message : "Success"}))
            .catch((err)=>{
                res.json(err)
            })
    }).catch((err)=>{
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
    try {
        const result = await Category.findOne({ category : req.body.category})
        if(result){
            return res.json({ message : "동일명 카테고리 존재"})
        } 
        const num = await OrderNum.findOneAndUpdate({ _id : "650d0391473c93aeea6ea12c"}, { $inc: { mainOrder: 1 }} )
        const category = new Category({
            category : req.body.category,
            order : num.mainOrder
        })
        await category.save()
            .then(()=> {
                res.status(200).json({ message : "Success"})
            })
            .catch(err => res.json(err))
    } catch(err){
        console.log(err)
        res.json(err)
    }
    
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

exports.readAllSubcategory = async (req, res) => {
    await Subcategory.find().sort({ order: 1 })
        .then(result =>{
            res.json(result)
        })
        .catch((err)=>{
            res.json(err)
        })
}

exports.createSubcategory = async (req, res) => {
    try {
        const result = await Subcategory.findOne({        
            category : req.body.category,
            subcategory : req.body.subcategory
        })
        if(result){
            return res.json({ message : "동일명 카테고리 존재"})
        }
        const num = await OrderNum.findOneAndUpdate({ _id : "650d0391473c93aeea6ea12c"}, { $inc: { subOrder: 1 }} )
        const subcategory = new Subcategory({
            category : req.body.category,
            subcategory : req.body.subcategory,
            order : num.subOrder
        })
        await subcategory.save()
            .then(()=> {
                res.status(200).json({ message : "Success"})
            })
            .catch(err => res.json(err))
    } catch(err){
        console.log(err)
        res.json(err)
    }
}
