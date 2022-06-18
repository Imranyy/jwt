const  User=require('../models/userModels');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const asyncHandler=require('express-async-handler')
require('dotenv').config();

//register user constroller
const registerUser=asyncHandler(async(req,res)=>{
    const {name,password,phoneNumber}=req.body
    if(!name|| !password|| !phoneNumber){
        res.status(400)
        throw new Error('Please add fields')
    }
    //check if user exist
    const userExist=await User.findOne({phoneNumber});
    if(userExist){
        res.status(400)
        throw new Error('User already Exists!!')
    }
    //Hashing password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt);
    //create user
    const user=await User.create({
        name,
        password:hashedPassword,
        phoneNumber
    })
    if(user){
        res.status(201).send({
            _id:user.id,
            name:user.name,
            phoneNumber:user.phoneNumber,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
});

//login user constroller
const loginUser=asyncHandler(async(req,res)=>{
    const {phoneNumber,password}=req.body;
    //check for user phonenumber
    const user=await User.findOne({phoneNumber})
    if(user&&(await bcrypt.compare(password,user.password))){
        res.send({
            _id:user.id,
            name:user.name,
            phoneNumber:user.phoneNumber,
            token:generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
});

//auth Middlerware
const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from headers
            token=req.headers.authorization.split(' ')[1]
            //verify token
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            //get user from the token
            req.user=await User.findById(decoded.id).select('password')
            next()

        }catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not Authorized, No Token Available')
    }
});
 
//downloadpage controller
const downloadPage=asyncHandler(async(req,res)=>{
    const {_id,name,phoneNumber}=await User.findById(req.user.id)
    res.status(200).send({
        id:_id,
        name,
        phoneNumber
    })
});

//generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1h'
    })
};

module.exports={ 
    protect,
    registerUser,
    loginUser,
    downloadPage
}