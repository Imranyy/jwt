const {
    User
}=require('../models/userModels')

//register user constroller
const registerUser=(req,res)=>{
    res.send({message:'user registered'})
}
//login user constroller
const loginUser=(req,res)=>{
    res.send({message:'user logged-in'})
}
//downloadpage controller
const downloadPage=(req,res)=>{
    res.send('download page')
}

module.exports={
    registerUser,
    loginUser,
    downloadPage
}