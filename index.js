const express=require('express');
const mongoose=require('mongoose');

require('dotenv').config();


//set app
const app=express();

//connect to db
mongoose.connect(process.env.DATABASE,{
    UnifiedTopology:true,
    
}).then(()=>{
    //listening to port
    const port=3000||process.env.PORT;
    app.listen(port,()=>{
    console.log(`Server running at ${port}`)
});
});

//routes middleware
app.use('/api',require('./routes/User'))

