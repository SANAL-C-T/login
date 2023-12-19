const userData = require("../model/userSchema");
const bcrypt = require("bcrypt");
const randomString = require("randomstring");
const { ObjectId } = require("mongodb");
//--------------------------------------------------------------------------------------
//admin routing starts...................

const adminLogin = async (req, res) => {
  try {
    console.log("-*-rendered admin login page-*-");
    res.render("adminLog");
  } catch (error) {
    console.log(error.message);
  }
};

const dashboard = async (req, res) => {
  try {
    console.log("--rendered dashboard page--");

    const usersDatas = await userData.find({ isadmin: 0 });
    res.render("adminHome", { userr: usersDatas });
  } catch (error) {
    console.log(error.message);
  }
};

const adminLogOut = async (req, res) => {
  try {
    console.log("**___logout__sucess___**");
    req.session.userLogin=false;
    req.session.userADMIN = false;
    res.redirect("/adminLog");
  } catch (error) {
    console.log(error.message);
  }
};

const adminEdit = async (req, res) => {
  try {
    console.log("_-_ admin is going to edit the user _-_");
    const id = req.query.id; // gets the value from url, because we passed this value in ejs hrf.

    // console.log("the id of the document:",id)

    const dataOfUser = await userData.findById({ _id: id });

    // console.log(dataOfUser)

    if (dataOfUser) {
      res.render("Edit", { contain: dataOfUser });
    } else {
      res.redirect("/adminHome");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const dataUpdate = async (req, res) => {
  try {
    console.log("//// admin has updated the user data///");
    //logic of data updation.
    const newdata = await userData.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
        },
      }
    );
    res.redirect("adminHome");
  } catch (error) {
    console.log(error.message);
  }
};

const back = async (req, res) => {
  try {
    console.log("### admin has move out of edit page ###");
    res.redirect("adminHome");
  } catch (error) {
    console.log(error.message);
  }
};

const addUser = async (req, res) => {
  try {
    res.render("addUser");
  } catch (error) {
    console.log(error.message);
  }
};

const saveUser = async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    const inputData = new userData({
      name: req.body.name,
      email: req.body.email,
      password: randomString.generate(8),
      phone: req.body.phone,
    });

    await inputData.save();
    res.redirect("adminHome");
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;
    const newdata = await userData.deleteOne({ _id: id });
    res.redirect("adminHome");
  } catch (error) {
    console.log(error.message);
  }
};

const searchUser = async (req, res) => {
  try {
    const query = req.query.search;
    console.log("Search Query:", query);

    const regex = new RegExp("^" + query, "i");
    console.log("Regular Expression:", regex);


    const Data= await userData.find({ name: { $regex: regex } })
    // const Data = await userData.find({
    //   $or: [{ name: { $regex: regex } }],
    //   is_admin: 0,
    // });
   

    console.log("Search Results:", Data);

    res.render("adminHome", {userr: Data });
  } catch (error) {
    console.log(error.message);
  }
};




const adminVerification = async (req, res) => {
  try {
    console.log("--started authentication check--");

    let inputAdminEmail = req.body.email;
    let inputAdminPassword = req.body.password;

    const dataInDatabase = await userData.findOne({ email: inputAdminEmail });

    if (dataInDatabase) {
      console.log('__________reached admin verification_______')
      const match = await bcrypt.compare(
        inputAdminPassword,
        dataInDatabase.password
        );
        
        if (match && dataInDatabase.isadmin == 1) {
          // req.session.admin = dataInDatabase._id;
          console.log("___admin___authenticated_____")
          req.session.userADMIN = true;
          // req.sesseion.adminLogin=true
          
          res.redirect("/adminHome");
        } else {
        console.log('___admin__authentication__failed__')
        res.render("adminLog", {
          message: "You are not authorized as an admin!",
        });
      }
    } else {
      res.render("adminLog", {
        message: "User not found. Authentication failed.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.render("adminLog", {
      message: "Authentication failed. Please try again.",
    });
  }
};

//---------------------------------------------------------------------------------------
module.exports = {
  adminLogin,
  adminVerification,
  dashboard,
  adminLogOut,
  adminEdit,
  dataUpdate,
  back,
  addUser,
  saveUser,
  deleteUser,
  searchUser,
};
