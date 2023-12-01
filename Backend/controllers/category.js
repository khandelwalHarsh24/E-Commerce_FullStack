
const categorySchema=require('../models/category');

const getCategory=async(req,res)=>{
    const categoryList=await categorySchema.find({});
    if(!categoryList){
        res.status(500).json({success:false,message:'The Category Does Not Exist'});
    }
    res.status(200).json(categoryList);
}

const singleCategory=async (req,res)=>{
    const category=await categorySchema.findById(req.params.id);
    if(!category) res.status(500).json({message:'The category with this Id is Not Found'})
    res.status(200).json(category);
}

const postCategory=async(req,res)=>{
    let newCategory=new categorySchema({
        name:req.body.name,
        icon:req.body.icon,
        color:req.body.color
    })
    newCategory=await newCategory.save();
    if(!newCategory) return res.status(404).send('The category cannot be created');
    res.status(200).json(newCategory);
}

const updateCategory=async(req,res)=>{
    const category=await categorySchema.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            icon:req.body.icon,
            color:req.body.color,
        },
        {new:true}
    )
    if(!category) return res.status(404).send('The category cannot be Updated');
    res.status(200).json(category);
}

const deleteCategory=async(req,res)=>{
    const delCategory=categorySchema.findByIdAndDelete(req.params.id).then(category=>{
        if(category){
            return res.status(200).json({success:true,message:'The category is deleted'});
        }
        else{
            return res.status(404).json({success:false,message:'Category Not Found'})
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
}

module.exports={getCategory,postCategory,deleteCategory,singleCategory,updateCategory};
