const db = require("../models");

// const { category : Category, subcategory : Subcategory } = db;
const { category : Category } = db;

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
exports.updateCategory = async (req, res) => {
   try {
    const { category, changedCategory, images } = req.body
    const result = await Category.findOneAndUpdate({ category }, {$set : {
        category : changedCategory,
        images : images
    }})
    console.log(result)
    res.status(200).json({message : "Success"})
   } catch (error) {
    console.log(error)
    res.status(500)
   }
}

// exports.deleteSubcategory = async (req, res) => {
//     const { category, subcategory } = req.body
//     await Subcategory.deleteOne({ category, subcategory })
//         .then(()=>{
//             res.status(200).json({ message : "Success"})
//         })
//         .catch((err)=>{
//             res.json(err)
//         })
// }
exports.createCategory = async (req, res) => {
    const {category, images} = req.body
    console.log(category, images);
    await Category.findOne({ category, images })
    .then(result =>{
        if(result){
            return res.json({ message : "동일명 카테고리 존재"})
        } else {
            const category = new Category({
                category : req.body.category,
                images : req.body.images
            })
            category.save()
                .then(()=> {
                    res.status(200).json({ message : "Success"})
                })
                .catch(err => res.json(err))
        }
    })
}
// exports.readSubcategory = async (req, res) => {
//     const { category } = req.body
//     await Subcategory.find({ category : category })
//         .then(result =>{
//             res.json(result)
//         })
//         .catch((err)=>{
//             res.json(err)
//         })
// }
// exports.readAllSubcategory = async (req, res) => {
//     await Subcategory.find()
//         .then(result =>{
//             res.json(result)
//         })
//         .catch((err)=>{
//             res.json(err)
//         })
// }
// exports.createSubcategory = async (req, res) => {
//     await Subcategory.findOne({        
//         category : req.body.category,
//         subcategory : req.body.subcategory
//     })
//     .then(result =>{
//         if(result){
//             return res.json({ message : "동일명 카테고리 존재"})
//         } else {
//             const subcategory = new Subcategory({
//                 category : req.body.category,
//                 subcategory : req.body.subcategory
//             })
//             subcategory.save()
//                 .then(()=> {
//                     res.status(200).json({ message : "Success"})
//                 })
//                 .catch(err => res.json(err))
//         }
//     })
    
// }
