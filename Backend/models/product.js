const mongoose=require('mongoose');

// Schema maps to MongoDB collection and  defines the shape of document within that collection
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    richDescription:{
        type:String,
        default:'',
    },
    image:{
        type:String,
        default:'',
    },
    images:[{
        type:String,
    }],
    brand:{
        type:String,
        default:'',
    },
    price:{
        type:Number,
        default:0,
    },
    category:{
        // This id connected to category table through refernce
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        default:0,
    },
    numReviews:{
        type:Number,
        default:0,
    },
    isFeatured:{
        type:Boolean,
        default:false,
    },
    dateCreated:{
        type:Date,
        default:Date.now,
    },


})


// Convert _id to id

productSchema.virtual('id').get(function (){
    return this._id.toHexString();
})

productSchema.set('toJSON',{
    virtuals:true,
})

module.exports= mongoose.model('Product',productSchema);

