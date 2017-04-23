'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function singUp(req,res){
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })
  user.save((err)=>{
    if(err) return res.status(500).send({message:'error al crear el usuario'+err})

    return res.status(201).send({token:service.createToken(user)})
  })
}
function singIn(req,res){
  User.find({emai:req.body.email},(err,user)=>{
    if(err) return res.status(500).send({message:err})
    if(!user)return res.status(404).send({message:'No existe el usuario'})

    req.user = user
    res.status(200).send({
      message:'te hhas logeado correctamente',
      token:service.createToken(user)
    })
  })
}

module.exports = {
  singIn,
  singUp
}
