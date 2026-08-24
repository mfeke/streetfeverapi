

const mongoose = require("mongoose");

const Code = mongoose.model(
    "Code",
    new mongoose.Schema({
        code: Number,
        user: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        

    })

)

module.exports = Code