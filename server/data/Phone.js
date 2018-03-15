const mongoose = require('mongoose')

let phoneSchema = new mongoose.Schema({
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    date: { type: Date, default: Date.now() },
    description: { type: String },
    isBought: { type: Boolean, default: false },
    performance: { type: String },
    display: { type: String },
    camera: { type: String },
    battery: { type: String }
    
})

let Phone = mongoose.model('Phone', phoneSchema)

module.exports = Phone

