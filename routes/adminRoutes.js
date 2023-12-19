const express=require("express");
const adminRoute=express();

const bodyparser=require("body-parser");
adminRoute.use(bodyparser.json());
adminRoute.use(bodyparser.urlencoded({extended:true}));

const session=require("express-session");
// adminRoute.use(session({secret:config.sessionSecret}));
adminRoute.use(session({
    secret:"helloadmingoodmornig",
    resave:false,
    saveUninitialized:true
}));

const adminAuth=require("../middleware/adminAuth");


// const userControllerForAdmin=require("../controller/userController");
const adminController=require("../controller/adminController");

adminRoute.set("view engine","ejs");
adminRoute.set("views","views");
adminRoute.use(express.static("public"));

adminRoute.get("/adminLog",adminAuth.isAdminLoggedOut,adminController.adminLogin);

adminRoute.post("/adminLog",adminController.adminVerification);

adminRoute.get("/adminHome",adminAuth.isAdminLoggedIn,adminController.dashboard);


adminRoute.get("/edit",adminAuth.isAdminLoggedIn,adminController.adminEdit);
adminRoute.post("/edit",adminController.dataUpdate);
adminRoute.get("/back",adminController.back);//in get we are getting the href in ejs

adminRoute.get("/add",adminController.addUser);
adminRoute.post("/add",adminController.saveUser);
adminRoute.get("/delete",adminController.deleteUser);
adminRoute.get("/search",adminAuth.isAdminLoggedIn,adminController.searchUser);

adminRoute.get("/adminLogOut",adminController.adminLogOut);

// adminRoute.get('*',(req,res)=>{
//     res.redirect("/")
// })

module.exports={
    adminRoute
}