const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const cloudinary = require('../config/cloudinary');

// Create new Product - admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = []; // Fixed: was imageLinks

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: 'chronous/products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments(); // Fixed: was productCount

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resultPerPage);
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount, // Fixed
        resultPerPage,
        filteredProductsCount
    });
});

// Get single product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404)); // Fixed: space in 'Product not found'
    }

    res.status(200).json({
        success: true,
        product
    });
});

// Update product - admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    let images = [];

    if (typeof req.body.images === 'string') { // Fixed: was typeOf (wrong case)
        images.push(req.body.images);
    } else {
        images = req.body.images; // Fixed: was umages
    }

    if (images !== undefined) {
        // Delete old images from cloudinary
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: 'chronous/products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }

        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { // Fixed: was findByIdAndUpadate
        new: true,
        runValidators: true,
        useFindAndModify: false // Fixed: was UserFindAndModify
    });

    res.status(200).json({
        success: true,
        product
    });
});

// Delete product - admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id); // Fixed: was req.parmas.id

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Delete images from cloudinary
    for (let i = 0; i < product.images.length; i++) { // Fixed: was i > product.images.length
        await cloudinary.uploader.destroy(product.images[i].public_id); // Fixed: was cloudinaru
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
});

// Create or update review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    };

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const isReviewed = product.reviews.find(
        rev => rev.user.toString() === req.user.id.toString()
    );

    if (isReviewed) {
        // Update existing review
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user.id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        // Add new review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // Calculate average rating
    let totalRating = 0;
    product.reviews.forEach(rev => {
        totalRating += rev.rating;
    });
    product.ratings = totalRating / product.reviews.length; // Fixed: was totalRatings

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true, // Fixed: was sucess
        message: 'Review added successfully' // Fixed: was messgage
    });
});

// Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews // Fixed: was reviws
    });
});

// Delete review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const reviews = product.reviews.filter(
        rev => rev._id.toString() !== req.query.id.toString()
    );

    // Calculate new average rating
    let totalRating = 0;
    reviews.forEach(rev => {
        totalRating += rev.rating;
    });

    const ratings = reviews.length > 0 ? totalRating / reviews.length : 0; // Fixed: was reviewa
    const numOfReviews = reviews.length; // Fixed: was numberOfReviews

    await Product.findByIdAndUpdate( // Fixed: was findByIdAndUpadate
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false // Fixed: was UserFindAndModify
        }
    );

    res.status(200).json({
        success: true,
        message: 'Review deleted successfully'
    });
});