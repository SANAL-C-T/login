
const express=require("express");
const routeApp=express();

const bodyparser=require("body-parser");
routeApp.use(bodyparser.json());
routeApp.use(bodyparser.urlencoded({extended:true}));



const session=require("express-session");
// const config=require("../configration/s");
// routeApp.use(session({secret:config.sessionSecret}));
routeApp.use(session({
    secret:"hellogoodmornig",
    resave:false,
    saveUninitialized:true
}));

const auth=require("../middleware/sessionAuth");

const userController=require("../controller/userController");

//above codes are importing various modules to use in this file........
//-----------------------------------------------------------------------------------
routeApp.set("view engine","ejs");
routeApp.set("views","views");

routeApp.use(express.static("public"));
//-----------------------------------------------------------------------------------

//routing code begins from here........................................
routeApp.get(["/", "/loginPage"],auth.isLoggedOut,userController.loginPage);

routeApp.post(["/", "/loginPage"],userController.loginVerification);

routeApp.get("/signUpPage",auth.isLoggedOut,userController.signUpPage); //this path ("/signUp") is passed to href of html. 

routeApp.post("/signUpPage",userController.storeData);

routeApp.get("/homepage",auth.isLoggedIn,userController.userHome);


routeApp.get("/logout",auth.isLoggedIn,userController.logout);


//-------------------------------------------------------------------------------------
//export code begins from here.........................................
module.exports={
    routeApp //exporting to server
    
}