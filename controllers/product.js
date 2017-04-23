'use strict'
const Product = require('../models/product')

function getProduct(req,res){
  let productID = req.params.productID

  Product.findById(productID,(err,product)=>{
    if(err) return res.status(500).send({message:'error al realizar la peticion'})
    if(!product) return res.status(404).send({message:'el producto no existe'})

    res.status(200).send({product:product})
  })
}
function getProducts(req,res){
  Product.find({},(err,products)=>{
    if(err) return res.status(500).send({message:'ocurrio un error'})
    if(!products) return res.status(404).send({message:'No se encontro nada en la base de datos'})

    res.status(200).send({message:products})
  })
}
function saveProduct(){
  console.log('Post /api/product');
  console.log(req.body);

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err,productStored)=>{
    if(err) res.status(500).send({message:'error al guardar en la base de datos'})

    res.status(200).send({product:productStored})
  })
}
function updateProduct(req,res){
  let productID = req.params.productID
  let update = req.body

  Product.findByIdAndUpdate(productID,update,(err,productUpdate)=>{
    if(err) res.status(500).send({message:'Error al actualizar'})
    res.status(200).send({message:productUpdate})
  })
}
function deleteProduct(req,res){
  let productID = req.params.productID;
  Product.findById(productID,(err,product)=>{
    if(err) res.status(500).send({message:'Erro al borrar el producto'})

    product.remove(err=>{
        if(err) res.status(500).send({message:'Erro al borrar el producto'})
        res.status(200).send({message:'Se ha borrado con exito '})
    })
  })
}

module.exports = {
  getProduct,
  saveProduct,
  getProducts,
  updateProduct,
  deleteProduct
}
