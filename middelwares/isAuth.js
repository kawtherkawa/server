const User = require ("../Model/User")
const jwt = require ('jsonwebtoken')


const isAuth =async(req,res, next)=>{
    try{
        const token = req.headers["authorization"];
    if (!token) {return res.status(400).send({ errors: {msg :"not Authorized 1"}  });}
    
    const decoded = jwt.verify(token, process.env.SCRT_KEY);

    const foundUser = await User.findOne({ _id: decoded.id });
    if (!foundUser) {return res.status(400).send({ errors : {msg :"not Authorized 2"}  });}


    req.user = foundUser;
    next();
  } catch (error) {
    res.status(400).send({ errors: {msg :"not Auhorized 3"}  });
  }
};

module.exports = isAuth;

