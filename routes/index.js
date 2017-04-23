'use strict'

const express = require('express')
const ProductController = require('../controllers/product')
const usercontrol = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/product',ProductController.getProducts)

api.get('/product/:productID',ProductController.getProduct)

api.post('/product',ProductController.saveProduct)

api.put('/product/:productID',ProductController.updateProduct)

api.delete('/product/:productID',ProductController.deleteProduct)

api.post('/signup',usercontrol.singUp)
api.post('/signin',usercontrol.singIn)

api.get('/private',auth,(req,res)=>{
  res.status(200).send({message:'Tienes acceso'})
})



module.exports = api
