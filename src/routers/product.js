require('../db/mongoose')
const product = require('../controllers/product')
const express = require('express')
const router = new express.Router()

//Add Product
router.post('/products/add',product.products_add)

//Display Products
router.get('/products/view',product.products_view)

module.exports = router
