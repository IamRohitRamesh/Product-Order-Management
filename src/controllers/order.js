const Order = require('../models/order')

//Add order by current user
exports.order_add = async (req,res)=>{
    const order = new Order({
        ...req.body,
        owner: req.user._id
    })
    try{
        await order.save()
        res.send(order)
    }catch(e){
        res.status(500).send(e)
    }
}

//Display orders of current user
exports.order_view = async (req,res)=>{
    const match = {}
    const sort = {}

    //Search with product name
    if(req.query.product){
        match.product = req.query.product
    }

    //Sort based on order creation
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1:1
    }
    try{
        await req.user.populate({
            path: 'orders',
            match,
            options:{
                sort
            }
        }).execPopulate()
        res.send(req.user.orders)
    }catch(e){
        res.status(500).send(e)
    }
}

//Update order by current user
exports.order_update = async (req,res) =>{
    const reqUpdate = Object.keys(req.body)
    const validUpdates = ['product','quantity']
    const possibleUpdate = reqUpdate.every((update)=>validUpdates.includes(update))

    if(!possibleUpdate){
        return res.status(400).send({error:'Invalid update!'})
    }

    try{
        const order = await Order.findOne({_id:req.params.id,owner:req.user._id})
        if(!order){
           return res.status(400).send()
        }
        reqUpdate.forEach((update)=>order[update]=req.body[update])
        await order.save()
        res.send(order)
    }catch(e){
        res.status(500).send(e)
    }
}

//delete order by current user
exports.order_delete = async(req,res)=>{
    try{
        const order = await Order.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!order){
            return res.status(400).send()
        }
        res.send(order)
    }catch(e){
        res.status(500).send(e)
    }
}