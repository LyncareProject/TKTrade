const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.cases = require("./email.model");
db.category = require("./category.model");
db.subcategory = require("./subcategory.model");

module.exports = db;