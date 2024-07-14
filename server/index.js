const express = require('express');
const mongoose = require('mongoose');
const financialRecordRouter = require('./routes/financialRecord')
const cors = require("cors");

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect('mongodb+srv://angad2212:mongo123@cluster0.rjx9sao.mongodb.net/')

app.use('/financial-records', financialRecordRouter)

app.listen(port, ()=>{
    console.log(`server is running on the port: ${port}`)
})