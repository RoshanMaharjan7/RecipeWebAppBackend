const bcrypt = require('bcrypt');
const User = require('../models/users.model')


// Create new User for user sign up
const userRegister = async (req, res) => {
    try {
        const {fullName, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({success: false, message: "Email already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({fullName, email, password:hashedPassword})
        if(!user){
            return res.status(401).json({success: false, message: "User Register Failed"})
        } 

        res.status(200).json({success: true, message: "User registered Successfully", data: user})

    } catch (error) {
        console.error("Error",error)
    }
};


// User Login
const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({success:false, message: "User not found"});
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(401).json({success: false, message:"Incorrect Password"})
        }

        res.status(200).json({success: true, message:"User Logged In successfully", data: user});
    } catch (error) {
        console.error("Error",error)
    }
}


module.exports = {userRegister, userLogin};