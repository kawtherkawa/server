const express=require("express")
const router=express.Router();
const Cases=require("../Model/Cases")

router.get("/test",(req,res)=>{
    
    res.send("hello gestion avocat") 
    })
/* casesNumber,casesSubjet,casesEtat,casesDate,casesClient,casesTribunal,casesDatePublication,casesDecision,
casesKhassim*/


router.post("/addCases",async(req,res)=>{
    try{
const {casesNumber,casesSubject,casesEtat,casesDate ,casesClient,casesTribunal,casesDatePublication,casesDecision,
    casesKhassim}=req.body
const newCases= new Cases({casesNumber,casesSubject,casesEtat,casesDate ,casesClient,casesTribunal,casesDatePublication,casesDecision,
    casesKhassim})
await newCases.save()
res.status(200).send({msg: "cases added",newCases})
    }catch(error){
        res.status(400).send({msg:"cases not added",error})
    }
})
router.get("/allCases",async(req,res)=>{
    try{
     const listCases= await Cases.find()
     res.status(200).send({msg: "all cases",listCases})
    }catch(error){
        res.status(400).send({msg:"can not get all cases",error})
    }
})
 router.delete('/:_id', async(req,res)=>{
try{
    const {_id}=req.params;
    await Cases.findOneAndDelete({_id})
    res.status(200).send({msg: "case deleted"})
} catch(error){
    res.status(400).send({msg:"can not deleted case",error}) 
}
 })
 router.put('/:_id',async(req,res)=>{
    try{
      const{_id}=req.params;
      const result=await Cases.findByIdAndUpdate({_id},{$set:{...req.body}})
      res.status(200).send({msg: "case updated"})
    }catch(error){
        res.status(400).send({msg:"can not update case",error}) 
    }
 })
router.get('/getOneCase/:_id',async(req,res)=>{
    try{
        const caseToGet=await Cases.findOne({_id:req.params._id})
        res.status(200).send({msg: "case",caseToGet})    
    }catch(error){
        res.status(400).send({msg:"can not get this case",error}) 
    }
})


module.exports=router