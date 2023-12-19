const isAdminLoggedIn = async(req,res,next)=>{
    try{
        if(req.session.userADMIN)
        
        {
            console.log(">>>>Admin is logedin (active session) in if condition in admin middleware<<<<")
           next(); 
        }else{
            console.log("$$$ Admin is logedin in else condition in admin middleware $$$")
            res.redirect("/adminLog");
        }
       
    }
    catch(error){
        console.log(error.message);
    }
};






const isAdminLoggedOut = async(req,res,next)=>{
    try{
        if(req.session.userADMIN)
       
        {
            console.log("Admin is logedout (active sesion) in if condition in admin middleware")
            res.redirect("/adminHome")
        }
        console.log("Admin is logedin (from inactive session) in else condition in admin middleware")
        next();
        }
    catch(error){
        console.log(error.message)
    }
}




module.exports={
    isAdminLoggedIn,
    isAdminLoggedOut
}