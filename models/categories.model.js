const mongoose = require("mongoose");

const Categories = mongoose.model(
    "Categories",
    new mongoose.Schema({
        name: String,
        description: String,
        image: String,
        createdAt: {
            type: Date,
            default: Date.now // Automatically inserts the current timestamp
        },
        status: {
            type:Boolean,
            default: false 
        },
        parentId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories"
        }],
    })

)

module.exports = Categories