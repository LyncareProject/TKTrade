const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.email = require("./email.model");
db.product = require("./product.model");
db.category = require("./category.model");
db.user = require("./user.model");
db.popup = require("./popup.model");

module.exports = db;