const express=require('express');
const router=express.Router();
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview
}=require('../controllers/productController');

const {isAuthenticatedUser,authorizeRoles}=require('../middleware/auth');

//public routes

router.get('/products',getAllProducts);
router.get('/product/:id',getProductDetails);
router.get('/reviews',getProductReviews);

//protected routes
router.put('/review',isAuthenticatedUser,createProductReview)
router.delete('/review',isAuthenticatedUser,deleteReview);

//admin routers
router.post('/admin/product/new',isAuthenticatedUser,createProduct)
router.put('/admin/product/:id',isAuthenticatedUser,updateProduct);
router.delete('/admin/product/:id',isAuthenticatedUser,deleteProduct)

module.exports=router;