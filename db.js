//import mongoose
const mongoose = require('mongoose');

//cretae mongoURL
const mongoURL = 'mongodb://localhost:27017/hotels'

//Connect using URL
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//create db object
const db = mongoose.connection;

//EVent listeners
db.on('connected',()=>{
    console.log('connected to MongoDB server');
})

db.on('disconnected',()=>{
    console.log('MongoDB server disconnected');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error:',err);
})


//export db connection
module.exports = db;