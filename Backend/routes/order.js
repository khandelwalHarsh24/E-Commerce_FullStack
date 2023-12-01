const express=require('express');
const { getOrder, postOrder, getSingleOrder, updateOrder, deleteOrder, getUserOrder ,countOrder,totalSale } = require('../controllers/order');
const router=express.Router();


router.route('/').get(getOrder).post(postOrder);
router.route('/:id').get(getSingleOrder).put(updateOrder).delete(deleteOrder);
router.route('/get/userorder/:id').get(getUserOrder);
router.route('/get/count').get(countOrder);
router.route('/get/totalSale').get(totalSale);

module.exports=router;