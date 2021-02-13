const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    quantity:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Product quantity cannot be negative')
            }
        }
    }
})


//Add only unique products --> else update
productSchema.statics.findByName = async (name,quantity)=>{
    const product = await Product.findOne({name})

    if(product){
        product.quantity = product.quantity+quantity
        return product
    }

    const productNew = new Product({name,quantity})
    return productNew
}

const Product = mongoose.model('Product',productSchema)

module.exports = Product