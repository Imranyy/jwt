const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser')
require('dotenv').config();


//set app
const app=express();

//cors
app.use(cors({origin:'localhost:3000'}))
//connect to db
mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{ 
    //listening to port
    const port=3000||process.env.PORT;
    app.listen(port,()=>{
    console.log(`Server running at ${port}`)
  }); 
}).catch((err)=>{
    console.log(err)
}); 
mongoose.Promise=global.Promise; 

//bodyparser middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
//routes middleware 
app.use('/api',require('./routes/User'))

 