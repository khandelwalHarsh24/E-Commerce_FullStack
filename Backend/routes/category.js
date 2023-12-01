const express=require('express');
const router=express.Router();

const {getCategory, postCategory, deleteCategory, singleCategory, updateCategory}=require('../controllers/category');

router.route('/').get(getCategory).post(postCategory);
router.route('/:id').get(singleCategory).delete(deleteCategory).put(updateCategory);

module.exports=router;