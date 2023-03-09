const express=require('express');
const app=express();
const connectdb=require('./DB/connectDB');
const cors=require('cors');
require('dotenv/config'); 
// Send log with specific status number
const morgan=require('morgan');
const authJwt=require('./helper/auth');
const errorhandler=require('./helper/error-handler')


// Cors for commincation
app.use(cors());
app.use('*',cors());

// Middleware for res parser into json===> checking everything going to server before it get executed
app.use(express.json());
app.use(morgan('tiny'));
// Check if user authenicated or not

app.use(authJwt()); 
app.use('/public/upload',express.static(__dirname+'/public/uploads'));
app.use(errorhandler);



// Routes
const productRoutes=require('./routes/product');
const categoryRoutes=require('./routes/category');
const userRoutes=require('./routes/user');
const orderRoutes=require('./routes/order');


app.use('/api/v1/products',productRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/orders',orderRoutes);



const start=async ()=>{
    try {
        await connectdb(process.env.URL);
        app.listen(3000,console.log(`Server Listening To The Port ${3000}`));
    } catch (error) {
        console.log(error);
    }
}

start();


// multer library to upload images to the server.
// add file destination to upload images to backend.
