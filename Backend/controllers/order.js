// const { populate } = require('../models/order');
const orderSchema=require('../models/order');
const OrderItem=require('../models/order-item')

const getOrder=async(req,res)=>{
    const orderList=await orderSchema.find().populate('user','name').sort({'dateOrdered':-1})
    .populate({path:'orderItems',populate:{path:'product',populate:'category'}});
    if(!orderList){
        res.status(500).json({success:false,message:'The Order Does Not Exist'});
    }
    res.status(200).json(orderList);
}

const getSingleOrder=async(req,res)=>{
    const order=await orderSchema.findById(req.params.id).populate('user','name')
    .populate({path:'orderItems',populate:{path:'product',populate:'category'}})
    
    if(!order){
        res.status(500).json({success:false,message:'The Order Does Not Exist'});
    }
    res.status(200).json(order);
}

// Calulating totalprice
const postOrder=async(req,res)=>{

    // promise return
    const orderItemIds=Promise.all(
        req.body.orderItems.map(async (orderItem)=>{
        let newOrderItem=new OrderItem({
            quantity:orderItem.quantity,
            product:orderItem.product
        })

        newOrderItem=await newOrderItem.save();
        return newOrderItem._id;
    }));


    const orderItemIdsResolved=await orderItemIds;

    const totalPrices=await Promise.all(orderItemIdsResolved.map(async orderprice=>{
        const orderItem=await OrderItem.findById(orderprice).populate('product','price');
        const price=orderItem.product.price * orderItem.quantity;
        return price;
    }))

    const totalprice=totalPrices.reduce((a,b)=>a+b,0);
    console.log(totalprice);

    let newOrder = new orderSchema({
        orderItems: orderItemIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalprice,
        user: req.body.user,
    })
    newOrder=await newOrder.save();
    if(!newOrder) return res.status(404).send('The Order cannot be created');
    res.status(200).json(newOrder);
}


const updateOrder=async(req,res)=>{
    const order=await orderSchema.findByIdAndUpdate(
        req.params.id,
        {
            status:req.body.status
        },
        {new:true}
    )
    if(!order) return res.status(404).send('The Order cannot be Updated');
    res.status(200).json(order);
}


// Delete OrderItem also
const deleteOrder=async(req,res)=>{
    const delOrder=orderSchema.findByIdAndDelete(req.params.id).then(async orders=>{
        if(orders){
            await orders.orderItems.map(async orderItem=>{
                await OrderItem.findByIdAndDelete(orderItem);
            })
            return res.status(200).json({success:true,message:'The orders is deleted'});
        }
        else{
            return res.status(404).json({success:false,message:'orders Not Found'})
        } 
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })

    // deleting OrderItems
}


const getUserOrder=async(req,res)=>{
    const userOrder=await orderSchema.find({user:req.params.userid})
    .populate({path:'orderItems',populate:{path:'product',populate:'category'}}).sort({'dateOrdered':-1});
    if(!userOrder){
        res.status(500).json({success:false,message:'The Order Does Not Exist'});
    }
    res.status(200).json(userOrder);
}

const countOrder= async(req,res)=>{
    const orderCount = await orderSchema.countDocuments({});
    if (!orderCount) {
        res.status(500).json({ success: false });
    }
    res.send({orderCount: orderCount});
}

const totalSale=async(req,res)=>{
    const totalSales = await orderSchema.aggregate([
        { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } },
      ]);
    
      if (!totalSales) {
        return res.status(400).send("The order sales cannot be generated");
      }
    
      res.send({ totalsales: totalSales.pop().totalsales });
}


module.exports={getOrder,postOrder,getSingleOrder,updateOrder,deleteOrder,getUserOrder,countOrder,totalSale};