const express = require('express');

const router = express.Router();

const emailRouter = require('./email.routes');
const categoryRouter = require('./category.routes');

router.use('/email', emailRouter);
router.use('/category', categoryRouter);

module.exports = router;