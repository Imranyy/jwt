const express=require('express');
const router=express.Router();
 
const{
    registerUser,
    loginUser,
    protect,
    downloadPage
}=require('../controllers/userController')

//register user
router.post('/',registerUser);


//login user
router.post('/login',loginUser);

//protected route
router.get('/download',protect,downloadPage);

module.exports=router;