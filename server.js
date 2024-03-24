const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');


const personRoutes=require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use(bodyParser.json()); 

app.use('/person',personRoutes);
app.use('/menu',menuRoutes);




const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log('server is listening on port 3000');
})