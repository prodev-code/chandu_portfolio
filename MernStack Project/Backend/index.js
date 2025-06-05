const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json({limit : "10mb"}))

const PORT = process.env.PORT || 8080
//mongodb connection
console.log(process.env.MONGODB_URL)

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("Connected to Database"))
.catch((err)=>console.log(err))

//schema
const userSchema = mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type : String,
        unique : true,
    },
    password : String,
    confirmPassword : String,
    image : String,
});
const userModel = mongoose.model("user",userSchema);

//api
app.get("/",(req,res)=> {
    res.send("Server is running")
})

//api sign up
app.post("/signup", async (req,res)=>{
    console.log(req.body)
    const { email } = req.body

    /*userModel.findOne({email : email},(err,result)=>{
        console.log(result)
        console.log(err)
        if(result){
            res.send({ message : "Email already register"})
        } else {
            const data = userModel(req.body)
            const save = data.save()
            res.send({message : "Successfully sign up"})
        }
    }) */
    
    try {
        const result = await userModel.findOne({ email });

        if (result) {
            res.send({ message: "Email already registered", alert : false });
        } else {
            const data = new userModel(req.body);  // use `new` to create an instance
            await data.save();  // wait for it to save
            res.send({ message: "Successfully signed up", alert : true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error", error: err.message });
    }
})

//api login
app.post("/login", async (req, res)=>{
    console.log(req.body)
    const {email,password} = req.body
    
    try {
       const result = await userModel.findOne({ email,password });

       if(result) {

        const dataSend = {
            _id:result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            image: result.image,
        };
        console.log(dataSend)
        res.send({message: "Login is successfully", alert: true, data : dataSend});
       }else {
          res.send({message: "Email not found", alert: false});
       }
    } catch(error) {
         console.error("Login error:", error);
         res.send({message: "Internal server error"});
    }
});

//product section

const schemaProduct = mongoose.Schema({
    name : String,
    category : String,
    image : String,
    price : String,
    description : String,
});
const productModel = mongoose.model("product",schemaProduct)

//save product
//api
app.post("/uploadProduct",async (req,res)=>{
    console.log(req.body);
    const data = await productModel(req.body)
    const datasave = await data.save()
    console.log(datasave)
    res.send({message : "Upload Successfully"});
})

//
app.get("/product", async (req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data));
})


app.listen(PORT,()=>console.log("server is running at port : " + PORT))
