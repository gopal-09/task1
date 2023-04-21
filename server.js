const express = require('express')
const app = express()
const router=require('./routes/user')
const mongoose=require('mongoose')
app.use(express.json())
app.use('/api',router)
require("dotenv").config()
mongoose.connect(process.env.mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



app.listen(5000,(req,res) => {
    console.log("server hitt")
})
