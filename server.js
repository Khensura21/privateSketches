//create instances of express and mongoose 
const express = require("express");
const mongoose = require('mongoose');


//create server app//
const app = express();


////MongoDB set up//
require('dotenv').config() //loads variables in .env file to process.env.VARIABLE_NAME 
const uri  = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected succesfully!");
});

//Middleware//
app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); // to support 


//create route for server to have access to
const sketchRouter = require("./routes")
app.use(sketchRouter)


//start server app
app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});