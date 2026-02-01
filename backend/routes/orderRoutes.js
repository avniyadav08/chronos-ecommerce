const express=require('express');
const router=express.Router();
const{
    newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    delteOrder,
    deleteOrder
}=require('../controllers/orderController')

const{isAuthenticatedUser,authorizeRoles}=require('../middleware/auth');

router.post('/order/new',isAuthenticatedUser,newOrder);
router.get('/order/:id',isAuthenticatedUser,getSingleOrder)
router.get('/orders/me',isAuthenticatedUser,myOrders)
router.get('/admin/orders',isAuthenticatedUser,getAllOrders)
router.put('/admin/order/:id',isAuthenticatedUser,updateOrder)
router.delete('admin/order/:id',isAuthenticatedUser,deleteOrder)

module.exports=router;