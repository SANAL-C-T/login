// const { match } = require("assert");
const userData=require("../model/userSchema")
const bcrypt=require("bcrypt")


//above code for importing
//------------------------------------------------------------------------------------
//routing logic begins here..........................


const loginPage=async(req,res)=>{
        
        try{
           res.render("userLog")
        }
        catch(error){
            console.log(error.message)
        }
};

const signUpPage=async(req,res)=>{
    
    try{
       res.render("userSign")
    }
    catch(error){
        console.log(error.message)
    }
};

const userHome=async(req,res)=>{
    try{
        const uData=await userData.findById({_id:req.session.user_id })
        res.render("homepage",{profileData:uData})
    }
    catch(error){
        console.log(error.message)
    }

    }



const logout=async(req,res)=>{
    try{
        console.log("in user controller logout")
        // req.session.destroy();
        req.session.userLogin=false;
        // req.session.userADMIN = false;
       res.redirect("/") 
    }
    catch(error){
        console.log(error.message)
    }
    
}



//------------------------------------------------------------------------------------

// password hashing.....................
const secretPass=async (password)=>{
    try{
        const hashedPass=await bcrypt.hash(password,10);
        return hashedPass;
    }
    catch(error){
        console.log(error.message)
    }
};
//-------------------------------------------------------------------------------------
//data to database................

const storeData=async (req,res)=>{
    try{

        const passwordCode=await secretPass(req.body.password);

        // console.log(JSON.stringify(req.body))
        const inputData=new userData({
            name:req.body.name,
            email:req.body.email,
            password:passwordCode,
            phone:req.body.phone

        })
        
        await inputData.save();
        res.redirect("/")
        
    }
    catch(error){
        console.log(error.message)

    }
};

//-------------------------------------------------------------------------------------
//login verification begins.......
const loginVerification= async (req,res)=>{
    try{
        let inputEmail=req.body.email;
        let inputPassword=req.body.password;

        const existInDataase=await userData.findOne({email:inputEmail});

        if(existInDataase){
           const match = await bcrypt.compare(inputPassword,existInDataase.password);
            if(match){
                req.session.user_id = existInDataase._id;
                req.session.userLogin=true;
                
                    res.redirect("/homepage")
                       
                    }
                    else{
                        res.render("userLog",{message:"Invalid user!"})
                    }


        }
        else{
            res.render("userLog",{message:"You have not signed up!"})
        }
    }
    catch(error){
        console.log(error.message);
    }
};


//-----------------------------------------




//routing logic ends here............................................

module.exports={
    loginPage,
    signUpPage,
    storeData,
    loginVerification,
    userHome,
    logout,
 
}






// we dont need this file to import view , because we are passing the function in a variable to routes, 
//routes has imported views . it will unpack the function there.