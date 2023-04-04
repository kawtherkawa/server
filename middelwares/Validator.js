const {check,validationResult}=require("express-validator")

exports.registerValidator=()=>[
    check("name","please enter your name ").not().isEmpty(),

check("email","please enter a valid email ").not().isEmpty().isEmail(),
check("phone","please enter a valid phone ").not().isEmpty(),
check("password","please enter a valid password ").isLength({min:6}),

]
exports.loginValidator=()=>[
    check("email","please enter a valid email ").not().isEmpty().isEmail(),
    check("password","please enter a valid password ").isLength({min:6}),

]


exports.validation = (req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({msg:errors.array()})
    }
    next()
    
}