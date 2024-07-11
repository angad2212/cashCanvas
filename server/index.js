const express = require('express');
const mongoose = require('mongoose');
const financialRecordRouter = require('./routes/financial-record')

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect('mongodb+srv://angad2212:iamADONIS3@cluster0.rjx9sao.mongodb.net/cashCanvas')

app.use('/financial-record', financialRecordRouter)

app.listen(port, ()=>{
    console.log(`server is running on the port: ${port}`)
})