const express = require('express');

const router = express.Router();

const controller = require("../controllers/popup.controller.js");

router.post("/", controller.create);
router.post("/find", controller.read);
router.put("/", controller.update);
router.delete("/:id", controller.delete);
router.get("/", controller.findAll);
router.get("/active", controller.findActive);

module.exports = router;
