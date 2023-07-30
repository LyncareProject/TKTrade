const express = require('express');

const router = express.Router();

const emailRouter = require('./email.routes');
const categoryRouter = require('./category.routes');
const productRouter = require('./product.routes');

router.use('/email', emailRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);

module.exports = router;