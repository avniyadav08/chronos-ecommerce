const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");

dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    cedentials:true
}));

app.get('/',(req,res)=>{
    res.json({
        message:'Chronos API is running',
        version:'1.0.0'
    });
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT} in ${process.env.NODE_ENV}mode`);
    
})
