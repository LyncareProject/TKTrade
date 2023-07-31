const express = require('express');

const router = express.Router();

const emailRouter = require('./email.routes');
const categoryRouter = require('./category.routes');
const productRouter = require('./product.routes');
const userRouter = require('./user.routes');
const uploadsRouter = require('./uploads.routes');

router.use('/email', emailRouter);
router.use('/category', categoryRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/uploads', uploadsRouter);

module.exports = router;