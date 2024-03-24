const express = require('express');
const app = express();
const db = require('../db');

const bodyParser = require('body-parser');

const MenuItem = require('../models/MenuItem');

app.use(bodyParser.json()); // store in req.body

app.post('/menu', async (req,res)=>{

  try{
    const data = req.body;// req body contains person data
  
  //create new person document using mongoose model
  const newItem = new MenuItem(data);

  const response = await newItem.save();
  console.log('data saved');
  res.status(200).json(response);

  }catch(err){
    console.log('error');
    res.status(500).json({error: 'internal server error'});
  }
})

app.get('/menu', async (req,res)=>{
  try{
    const data = await MenuItem.find();
    console.log('data saved');
    res.status(200).json(data);


  }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server error'});
  }
})


app.listen(3000,()=>{
  console.log('server is listening on port 3000');
})