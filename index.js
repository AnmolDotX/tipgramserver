const express = require('express')
const app = express()
const cors = require('cors')
require('./mongoConnect.js') // database connection file
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute')

// load environment variables
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());


// use imported route file
app.use("/api/auth",userRoute)


// server running port
app.listen(process.env.PORT, ()=>{
    console.log(`server running on port : ${process.env.PORT}`);
})