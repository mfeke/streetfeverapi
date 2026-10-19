

const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        fullName: String,
        password: String,
        mobileNumber: Number,
        merchantDetails: {
            businessName: {
                type: String,
            },
            businessType: { type: String },
            category: { type: String },
            primaryContact: {
                name: { type: String },
                phone: { type: String },
                email: { type: String },
                position: { type: String } 
            },

            address: {
                street: { type: String },
                suburb: { type: String },
                city: { type: String },
                postalCode: { type: String }
            },
            isVerified: { type: Boolean}
        },

        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]

    })

)

module.exports = User