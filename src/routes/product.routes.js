const express = require('express');

const router = express.Router();

const controller = require("../controllers/product.controller.js");



router.post("/", controller.create);
router.post("/find", controller.read);
router.put("/", controller.update);
router.delete("/:id", controller.delete);
router.get("/", controller.findAll);


module.exports = router;