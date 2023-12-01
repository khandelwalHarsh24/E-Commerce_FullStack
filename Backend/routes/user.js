const express=require('express');
const router=express.Router();

const {getUsers, postUsers, updateUser, getSingleuser, userLogin, userRegister, countUser, deleteUser}=require('../controllers/user');

router.route('/').get(getUsers).post(postUsers);
router.route('/:id').put(updateUser).get(getSingleuser).delete(deleteUser);
router.route('/login').post(userLogin);
router.route('/register').post(userRegister);
router.route('/get/count').get(countUser);


module.exports=router;