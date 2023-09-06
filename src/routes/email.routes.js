const express = require('express');

const router = express.Router();

const controller = require("../controllers/email.controller");

router.post("/", controller.postEmail);
router.post("/catalog", controller.requestCatalog);

module.exports = router;