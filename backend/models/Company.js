const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
    type: {
        type: String,
        enum: ["burger", "pizza", "gyro"],
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 10,
    },
    img: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    rating: {
        type: Number,
        required: true,
        min: 1
    },
    review: {
        type: String,
        required: false,
        min: 5
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model("Company", CompanySchema)