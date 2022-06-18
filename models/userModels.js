const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema= new Schema({
    name:{
        type:String,
        require:[true, 'Please enter your name']
    },
    password:{
        type:String,
        require:[true,'Please enter password']
    },
    phoneNumber:{
        type:Number,
        require:[true,'Please enter your Mobile number'],
        unique:true
    }
    
},{
    timestamps:true
});
 
 module.exports= mongoose.model('user',userSchema);