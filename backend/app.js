const express = require("express");
const bodyParser = require("body-parser");
var createError = require('http-errors');
const Seedrouter = require("./routes/seedRouter");
const userRoute = require("./routes/userRoute");


const app  = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//client side error handling

app.get('/test', (req,res) =>{
res.status(200).json({
    message: "Api"
})
})
app.use("/user/api",userRoute); 
app.use("/seed/api" , Seedrouter)

//client side error handling
app.use((req,res,next) => {
  next( createError(404,  "Route Error"));
   

})

//server side error handling
app.use((err, req,res,next) => {
   return res.status(err.status || 500).json({ 
    sucess : "false",
    message : err.message})

});
module.exports = app;

