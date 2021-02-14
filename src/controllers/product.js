const Product = require('../models/products')

exports.products_add = async(req,res)=>{
    try{
        const product = await Product.createOrUpdate(req.body.name,req.body.quantity)
        await product.save()
        res.send(product)
    }catch(e){
        res.status(500).send(e)
    }
}

exports.products_view = async (req,res)=>{
    const products = await Product.find({})
    
    try{
        res.send(products)
    }catch(e){
        res.status(500).send(e)
    }
}