'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db,(err,res) =>{
  if(err) {
    var e = err
    return console.log('error al conectar ala base de datos '+err)
  }
  console.log('conexion ala base de dartos extablecida')
  app.listen(config.port,()=>{
    var p = config.port
    console.log('Api rest corriendo en 127.0.0.1: '+p)
  })
})
