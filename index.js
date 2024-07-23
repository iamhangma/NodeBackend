// importing
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const cors = require('cors');
const multiparty = require('connect-multiparty')
const cloudinary = require('cloudinary');

// Making express app
const app = express();

// dotenv config
dotenv.config();

// cors policy
const corsPolicy = {
    origin : true,
    credentials : true,
    optionSuccessStatus : 200,   
}
app.use(cors(corsPolicy))

// multiparty middleware
app.use(multiparty())

// cloudinary config
          
cloudinary.config({ 
    cloud_name:'dslamgamd',
    api_key: '576226748471547',
    api_secret:'5O2OjBI1zxeAUPRgRPg9YAzfYNw'
  });
// mongodb connection
connectDB();

// Accepting json data
app.use(express.json());

// test route
app.get('/test',(req,res)=>{
    res.send('Hello')
})
// http://localhost:5000/test

// user routes
app.use('/api/user', require('./Routes/userRoutes'))
// our actual routes
// http://localhost:5000/api/user/create
// http://localhost:5000/api/user/login

// CREATE A ROUTE FOR PRODUCTS
app.use('/api/product', require('./routes/productRoutes'))


// defining ports
const PORT = process.env.PORT || 5051;
// run the server
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

//exporting
module.exports=app;