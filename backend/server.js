const express=require("express");
const dotenv=require("dotenv");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const connectDatabase=require("./config/database.js");
const errorMiddleware=require('./middleware/error.js');

dotenv.config();

const app=express();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));



app.get('/',(req,res)=>{
    res.json({
        message:'Chronos API is running',
        version:'1.0.0',
        database:'connected'
    });
});

//import router
const authRoutes=require("./routes/authRoutes.js");
app.use('/api/v1/auth',authRoutes);
app.use(errorMiddleware);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} in ${process.env.NODE_ENV}mode`);

})
