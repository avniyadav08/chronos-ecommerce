const Product =require("../models/productModel")
const ErrorHandler=require("../utils/errorHandler")
const catchAsyncErrors=require('../middleware/catchAsyncErrors')
const APIFeatures=require('../utils/apiFeatures');

//create new Product - admin
exports.createProduct=catchAsyncErrors(async(req,res,next)=>{
    req.body.user=req.user.id;

    const product= await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    });
});

//get all products
exports.getAllProducts=catchAsyncErrors(async(req,res,next)=>{
    const resultPerPage=8;
    const productCount=await Product.countDocuments();

    const apiFeatures=new APIFeatures(Product.find(),req.query)
    .search()
    .filter();

    let products=await apiFeatures.query;
    let filteredProductsCount=products.length;

    apiFeatures.pagination(resultPerPage);
    products=await apiFeatures.query.clone();

    res.status(200).json({
        success:true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount
    });
});

//get single product details
exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return next (new ErrorHandler('Productnot found',404));
    }

    res.status(200).json({
        success:true,
        product
    });
});


//update product - admin
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }

    product=await Product.findByIdAndUpadate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        UserFindAndModify:false
    });
    
    res.status(200).json({
        success:true,
        product
    });
});


//delete product -admin
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.parmas.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:'Product deleted successfully'
    });
});

//create or update review
exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{
    const {rating,comment,productId}=req.body;

    const review={
        user:req.user.id,
        name:req.user.name,
        rating:Number(rating),
        comment
    };

    const product=await Product.findById(productId);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    const isReviewed=product.reviews.find(
        rev=>rev.user.toString()===req.user.id.toString()
    );

    if(isReviewed){
         product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user.id.toString()){
                rev.rating=rating;
                rev.comment=comment;
            }
         });
    }else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }

    //calculate average rating
    let totalRating=0;
    product.reviews.forEach(rev=>{
        totalRating+=rev.rating;
    });
    product.ratings=totalRatings/product.reviews.length;

    await product.save({validateBeforeSave:false});
    res.status(200).json({
        sucess:true,
        messgage:'Review added successfully'
    });
});


//get all reviews of a product
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }
    res.status(200).json({
        success:true,
        reviws:product.reviews
    });
});

//delete review
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler('Product not found',404));
    }

    const reviews=product.reviews.filter(
        rev=>rev._id.toString()!==req.query.id.toString()
    );

    //calculate new average rating
    let totalRating=0;
    reviews.forEach(rev=>{
        totalRating+=rev.rating;
    })

    const ratings=reviews.length>0 ? totalRating / reviewa.length :0;
    const numberOfReviews=reviews.length;

    await Product.findByIdAndUpadate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new:true,
            runValidators:true,
            UserFindAndModify:false
        }
    );
    res.status(200).json({
        success:true,
        message:'Review deleted successfully'
    }); 
});