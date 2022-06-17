const express=require('express');
const router=express.Router();

const{
    registerUser,
    loginUser,
    downloadPage
}=require('../controllers/userController')

//register user
router.post('/',registerUser);


//login user
router.post('/login',loginUser);

//protected route
router.get('/download',downloadPage);

module.exports=router;