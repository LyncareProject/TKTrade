const express = require('express');

const router = express.Router();

const controller = require("../controllers/product.controller.js");

router.post("/", controller.create);
router.get("/:id", controller.read);
router.put("/", controller.update);
router.delete("/", controller.delete);
router.get("/", controller.findAll);


module.exports = router;