const express = require("express");
const userDetails = require("../model/userSignup")
const app = express();
const router = express.Router();

router.get("/showUsers", async(req, res)=>{
    try{
        const allUsers = await userDetails.find();
        if(allUsers.length===0){
            return res.status(400).json({
                Message: "No Users Found"
            })
        }
        res.status(200).json({
            Message: "All Users",
            Users: allUsers
        })
    }
    catch{
        res.status(500).json({
            Message: "Internal Server Error"
        })
    }
})


router.post("/signup", async(req, res)=>{
    try{
        const {name, email, password} = req.body;
        const oldUser = await userDetails.findOne({email});
        if(oldUser){
            return res.status(409).json({
                Message: "User Already Exist"
            })
        }
        const newUser = new userDetails({
            name,
            email,
            password
        });
        await newUser.save();
        res.status(201).json({
            Message: "User Created"
        });
    }
    catch{
        res.status(500).json({
            Message: "Internal Server Error"
        })
    }
});

router.post("/userbyemail", async(req,res)=>{
    try{
        const { email } = req.body;
        if(!email){
            return res.status(400).json({
                Message: "Email is required"
            })
        }
        const checkUser = await userDetails.find({ email });
        if (checkUser.length === 0){
            return res.status(404).json({
                Message: "User not found",
            })
        }
        res.status(200).json({
            Message: "User found",
            User_Details: checkUser
        })
    }
    catch(err){
        res.status(500).json({
            Message: "Internal Server Error",
            Error: err.message
        })
    }
})

module.exports = router