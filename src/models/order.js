const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    product:{
        type:String,
        trim:true,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        validate(value){
            if(value<0){
                throw new Error('Quantity must be positive')
            }
        }
    },
    //relationship with user
    owner:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order