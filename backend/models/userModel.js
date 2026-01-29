const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt =require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter you name'],
        maxLength:[50,'Name cannot exceed 50 characters']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unqiue:true,
        lowercase:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
        ]
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minLength:[6,'Password must be at leat 6 characters'],
        select:false // Don't send password in queries by default
    },
    avatar:{
        public_id:{
            type:String,
            default:'avatars/default_avatar'
        },
        url:{
            type:String,
            default:'https://res.cloudinary.com/dh4nbf2pc/image/upload/v1769707375/Watches_LP_carousel_Style_Mens_classic_cp6k9k.jpg'
        }
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

//password hash

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

// password comparison
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

//generate jwt token

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
};

module.exports=mongoose.model('User',userSchema);