const  mongoose=require("mongoose")
const schema=mongoose.Schema;
const casesSchema=new schema({
    casesNumber : {
        type: Number,   /*عدد القضية*/ 
    },
    
    casesSubject : {
        type: String,/* موضوع */ 
    },

    casesEtat : {
        type: String, /* حالتها :سارية او منتهية*/ 
    }, 

    casesDate : {
        type: String, /* تاريخ القضية*/
    }, 

    casesClient : {
       type : String  /* المنوب*/ 
    },
    casesTribunal:{
        type : String /* المحكمة */
    },
    casesDatePublication:{
                        /*تاريخ نشر القضية  */
    type : String,
    },
   casesDecision:{
        type:String, /*الحكم  */
   },
   /** اسم ولقب الخصم */
   casesKhassim :{
    type:String, 
}
})
// export
module.exports=Cases=mongoose.model("cases",casesSchema)