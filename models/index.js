const mongoose = require("mongoose")
const dbConfig = require("../db/db")
mongoose.Promise = global.Promise

const db ={};
db.mongoose = mongoose
db.user = require("../models/user.model")
db.category = require("../models/categories.model")
db.url = dbConfig.url

module.exports = db