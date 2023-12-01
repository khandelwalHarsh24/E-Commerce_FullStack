function error_handler(err,req,res,next){
    
    if(err.name=='UnauthorizedError'){
        return res.status(401).json({message:"The user is not Authenicated"});
    }

    if(err.name=='ValidationError'){
        return res.status(401).json({message:err});
    }
    return res.status(500).json(err);
}

module.exports=error_handler;