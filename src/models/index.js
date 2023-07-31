const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.email = require("./email.model");
db.product = require("./product.model");
db.category = require("./category.model");
db.subcategory = require("./subcategory.model");
db.user = require("./user.model");

module.exports = db;