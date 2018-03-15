const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let buyingSchema = new mongoose.Schema({
   user: { type: ObjectId, required: true, ref: 'User' },
   phone: { type: ObjectId, required: true, ref: 'Phone' },
   totalPrice: { type: Number, required: true },
   boughtOn: { type: Date, default: Date.now() }
})

let Buying = mongoose.model('Buying', buyingSchema)

module.exports = Buying