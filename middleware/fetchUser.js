const jwt = require('jsonwebtoken');

const JWT_SECRET = 'OmkarPhadtare';

fetchUser = (req,res,next)=>{
    //Get user form jwt tokens and append
    const token = req.header('auth-token');
    if(!token)
    {
        //Access Denied 401
        res.status(401).json({err:"Please Authenticate using valid token"});
    }

   try{
    const data = jwt.verify(token,JWT_SECRET);
    req.user = data.user;
    next();

   }catch(err){
    res.status(401).json({err:"Authentication Error occurs"})
   }
}
module.exports = fetchUser;