
//below code is the server
const express=require("express");
const app=express();

const nocache = require("nocache");
app.use(nocache());

const userRequest=require("./routes/userRoutes")
const adminRequest=require("./routes/adminRoutes")
app.use("/",userRequest.routeApp)
app.use("/",adminRequest.adminRoute)


app.listen(3000,function(req,res){
    console.log("Server is running...")
})