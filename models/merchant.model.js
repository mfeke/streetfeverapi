const mongoose = require("mongoose");

const Merchant = mongoose.model(
    "Merchant",
    new mongoose.Schema({
        fullName:String,
        email:String,
        mobileNumber: Number,
        password:String,
        storeName: String,
        slug: String,
        businessType: String,
        logoUrl: String,
        contact: {
            countryCode: String,
            phone: Number,
            email: String
        },
        location: {
            type: String,
            // coordinates: [18.4241, -33.9249], 
            address: String,
            city: String,
            postalCode: Number
        },
        operatingHours: Array,
        deliverySettings: {
            offersDelivery: {type:Boolean, default: false},
            offersPickup: {type:Boolean,default: false},
            maxDeliveryRadiusKm: Number,
            prepTimeMinutes: Number 
        },
        payoutAccount: {
            bankName: String,
            accountNumber: String,
            branchCode: String 
        },
        status: {
            type: Boolean,
            default: false
        },
    })
)


module.exports = Merchant