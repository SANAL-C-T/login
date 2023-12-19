const isLoggedIn = async(req,res,next)=>{
    try{
        if(req.session.userLogin){
            console.log("user is logged in if ")
           next(); 
        }else{
            console.log("user is logged in else")
            res.redirect("/loginPage");
        }
       
    }
    catch(error){
        console.log(error.message);
    }
};






const isLoggedOut = async(req,res,next)=>{
    try{
        if(req.session.userLogin)
       
        {
            console.log("user is logged out if")
            res.redirect("/homepage")
        }
        console.log("user is logged  out in else-ondition of logout")
        next();
        }
    catch(error){
        console.log(error.message)
    }
}




module.exports={
    isLoggedIn,
    isLoggedOut
}