const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/WEEK_9").then(res=>{
    console.log("connected to mongodb database")
})
//above code week_9 is the name of database.
//above code connects model to server.
