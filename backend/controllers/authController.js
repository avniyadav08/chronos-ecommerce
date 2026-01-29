const User=require('../models/userModel.js')
const ErrorHandler=require('../utils/errorHandel.js')
const catchAsyncErrors=require('../middleware/catchAsyncErrors.js')
const sendToken=require('../utils/jwtToken.js')
const bcrypt=require("bcryptjs");

//Register User

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user=await User.create({
        name,
        email,
        password
    });

    sendToken(user,201,res);
})

//login user
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;

    //check if email and password is entered
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password',400));
    }

    //find user in database
    const user=await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid email or password',401));
    }

    //check if password is correct
    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
        return next (new ErrorHandler('Invalid email or password',401));
    }
    sendToken(user,200,res);

});


//logout user

exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:'Logged out successfully'
    });
});