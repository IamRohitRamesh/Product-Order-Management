require('../db/mongoose')
const express = require('express')
const order = require('../controllers/order')
const router = new express.Router()
const auth = require('../middleware/auth')

//Create order
router.post('/orders/add',auth,order.order_add)

//Display orders
router.get('/orders/view',auth,order.order_view)

//Update order
router.patch('/orders/update/:id',auth,order.order_update)

//Delete Order
router.delete('/orders/delete/:id',auth,order.order_delete)

module.exports = router