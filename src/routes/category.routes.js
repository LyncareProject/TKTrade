const express = require('express');

const router = express.Router();

const controller = require("../controllers/category.controller");

router.get("/", controller.readCategory);
router.post("/", controller.createCategory);
router.delete("/:category", controller.deleteCategory);
router.post("/subcategory", controller.readSubcategory);
router.post("/subcategory/create", controller.createSubcategory);
router.post("/subcategory/delete", controller.deleteSubcategory);
module.exports = router;