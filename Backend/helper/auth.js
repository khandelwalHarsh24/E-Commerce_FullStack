// Securing api
// Put expressjwt in any api will secure the api 
const {expressjwt}=require('express-jwt');

// Token is created based on secret so pass token to backend compare with secret
// If token is based on our secret then able to use other api
// able to seen products list without authenicated or get request is visible
// using regex for api 
function authJwt(){
    const secret=process.env.secret;
    return expressjwt({
        secret,
        algorithms:['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            {url:/\/public\/upload(.*)/,method:['GET','POST','OPTIONS']},
            {url:/\/api\/v1\/products(.*)/,method:['GET','OPTIONS']},
            {url:/\/api\/v1\/category(.*)/,method:['GET','OPTIONS']},
            {url:/\/api\/v1\/orders(.*)/,method:['GET','POST','OPTIONS']},
            '/api/v1/user/login',
            '/api/v1/user/register'
            // {url:/(.*)/}
        ]
    })
} 

async function isRevoked(req, payload) {
    console.log(payload);
    if (payload.isAdmin == false) {
      console.log('Not Admin');
      return true;
    }
    console.log('Admin');
    return false;
}

module.exports= authJwt;