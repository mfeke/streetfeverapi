

const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        firstName:String,
        lastName:String,
        pass:String,
        roles:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]

    })

)

module.exports = User