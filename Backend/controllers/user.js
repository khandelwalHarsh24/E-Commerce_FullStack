const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');

// List of User
const getUsers = async (req, res) => {
  const user = await userSchema.find().select('-passwordHash');
  if (!user) {
    res.status(500).json({ success: false });
  }
  res.status(200).json(user);
};


// Get Single User
const getSingleuser = async (req, res) => {
  const singleUser = await userSchema.findById(req.params.id).select('-passwordHash')
  if (!singleUser) {
    res
      .status(500)
      .json({ success: false, message: "The User Does Not Exist" });
  }
  res.status(200).json(singleUser);
};


// bcryptjs for password hashing
// This is for admin
const postUsers = async (req, res) => {
  let newUser = new userSchema({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  newUser = await newUser.save();

  if (!newUser) return res.status(404).send("The user cannot be created");
  res.status(200).json(newUser);
};


// Update User
const updateUser = async (req, res) => {
  
  const userExist=await userSchema.findById(req.params.id);

  let newPassword;
  if(req.body.password){
    newPassword=bcrypt.hashSync(req.body.password, 10)
  }
  else{
    newPassword=userExist.passwordHash;
  }

  const userData = await userSchema.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );
  if (!userData) return res.status(500).send("The User cannot be Updated");
  res.status(200).json(userData);
};


// Authenication Token
// User-->Authenication Server-->Token-->Application Server--> request for an API
const userLogin=async(req,res)=>{

  const user=await userSchema.findOne({email:req.body.email})
  const secret=process.env.secret;
  if(!user){
    return res.status(400).json({success:false,message:'The user not found'})
  }

  if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
    // any  data with token in object
    // user with this secret can access the api which is provided by us.
    const token=jwt.sign(
      {
        userId:user.id,
        isAdmin:user.isAdmin,
      },
      secret,
      {expiresIn:'1d'}
    )
    res.status(200).send({email:user.email,token:token});
  }
  else{
    res.status(400).send('Password is Wrong')
  } 
}

// User Register
const userRegister = async (req, res) => {
  let newUser = new userSchema({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  newUser = await newUser.save();

  if (!newUser) return res.status(404).send("The user cannot be created");
  res.status(200).json(newUser);
};


// Delete User
const deleteUser=(req,res)=>{
  const delUser= userSchema.findByIdAndDelete(req.params.id).then(user=>{
      if(user){
          return res.status(200).json({success:true,message:'The user is deleted'});
      }
      else{
          return res.status(404).json({success:false,message:'User Not Found'})
      }
  }).catch(err=>{
      return res.status(400).json({success:false,error:err})
  })
}

// Count User
const countUser=async(req,res)=>{
   const countuser=await userSchema.countDocuments({});
   if(!countuser){
    res.status(500).json({success:false});
  }
  
  res.status(200).send({users:countuser});
}



module.exports = { getUsers, postUsers, updateUser,getSingleuser,userLogin,userRegister,countUser,deleteUser};
