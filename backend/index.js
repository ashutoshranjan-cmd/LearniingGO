require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const signupRoutes = require('./Routes/user.routes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users',signupRoutes)
app.use(cors())
// app.get('/',(req,res)=>{

//     res.send("The server is working ")
// })


mongoose.connect(process.env.URI)
.then(()=>{
    console.log("The data base is conected to mongodb");
    app.listen(process.env.PORT,()=>{
        console.log("The system is working fine on port ",process.env.PORT);
    })    
})
.catch((error)=>{
    console.log("This is something error in the connection",error);
})


