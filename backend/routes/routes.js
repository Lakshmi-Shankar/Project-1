const express = require("express");
const userDetails = require("../model/user")
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
})

module.exports = router