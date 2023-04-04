// 1 require epress
const express=require("express")
const cors = require("cors")
const bodyParser=require("body-parser")
const sendEmail = require("./utils/sendEmail")
// 2 instance of express
const app= express()
//4 require dotenv config

require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


//3 create port 
const PORT=process.env.PORT 

//  connect base 
connectDB=require("./config/connectDB")
connectDB();


///////
app.use("/api/cases" , require("./routes/cases"))
app.use("/api/user" , require("./routes/user"))


// Route
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/sendemail", async (req, res) => {
  const { email } = req.body;

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Thank You Message From NodeCourse";
    const message = `
        <h3>Hello Zino</h3>
        <p>Thank for your YouTube Tutorials</p>
        <p>Regards...</p>
    `;

    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});


/*app.use((req,res)=>{
    res.send("helooo c kqw==")
})*/
app.listen(PORT , error => {
    error ? console.error(`Fail To connect , ${error} `) 
  : console.log(`LocalServer is running on port ${PORT}` ) 
})