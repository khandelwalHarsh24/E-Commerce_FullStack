

const productSchema=require('../models/product');


// Filtering By Category = get products of category chosen ==> query params 
const getProduct=async (req,res)=>{
    // localhost:3000/api/v1/products?categories=a,b,c

    let filter={};

    // if filter apply then use this category as a array otherwise no Filter
    if(req.query.categories){
        filter={category:req.query.categories.split(',')};
    }
    const productList=await productSchema.find(filter).populate('category');
    if(!productList){
        res.status(500).json({success:false,message:'The Products do Not Exist'});
    }
    res.status(200).json(productList);
}


// Get a Single Product
const getSingleproduct=async(req,res)=>{
    // populate = to connect mongodb table and to show nested table items
    const product=await productSchema.findById(req.params.id);
    if(!product){
        res.status(500).json({success:false,message:'The Product Does Not Exist'});
    }
    res.status(200).json(product);
    
}




// Delete Product Request
const deleteProduct=(req,res)=>{
    const delProduct= productSchema.findByIdAndDelete(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({success:true,message:'The Product is deleted'});
        }
        else{
            return res.status(404).json({success:false,message:'Product Not Found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
}


// Statistics Request
const getCount=async (req,res)=>{  
    const productCount=await productSchema.countDocuments({});
    if(!productCount){
        res.status(500).json({success:false});
    }
    res.status(200).send({product:productCount});
   
}


// Featured Product on HomePage with limit 
const getFeaturedProduct=async (req,res)=>{ 
    const count=req.params.count? req.params.count:0;
    const products=await productSchema.find({isFeatured:true}).limit(+count);
    if(!products){
        res.status(500).json({success:false});
    }
    // console.log(products);
    res.status(200).json(products);  
}


module.exports={getProduct,getSingleproduct,deleteProduct,getCount,getFeaturedProduct};



// const productList=await productSchema.find({}).select('name image -_id');  ==> to select products some points only
