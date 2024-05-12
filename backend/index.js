const express = require("express");
const cors = require("cors");

require('./db/config');
const user = require("./db/user");
const product = require("./db/product");
const Jwt = require('jsonwebtoken');
const JwtKey = 'e-com';

const app = express();
app.use(express.json());
app.use(cors());
app.post("/register",async (req,resp) => {
    let newuser = new user(req.body);
    let result = await newuser.save();
    result = result.toObject();
    delete result.password; 
    
    Jwt.sign({result} , JwtKey,{expiresIn:"2h"},(err,token) => {
        if(err){
            resp.send( "Something went wrong, Please try again");
        }
        resp.send({result,auth:token})
    }) 
});

app.post("/login", async (req,resp) => {
    if(req.body.password && req.body.email){
        let loginuser = await user.findOne(req.body).select("-password");
        if(loginuser){

            Jwt.sign({loginuser} , JwtKey,{expiresIn:"2h"},(err,token) => {
                if(err){
                    resp.send( "Something went wrong, Please try again");
                }
                resp.send({loginuser,auth:token})
            }) 

            
        }
        else{
            resp.send("No User Found");
        }
    }
    else{
        resp.send("Please input Email and Password");
    }
  
    
});

app.post("/add-product", async (req,resp) => {
    let productdata = new product(req.body);
    let result = await productdata.save();
    resp.send(result);
});

app.get("/products" , async (req,resp) => {
    let products = await product.find();
    if(products.length > 0){
        resp.send(products);
    }
    else{
        resp.send({result:"No Products found"});
    }
})

app.delete("/product/:id",async (req,resp) => {
    
    const result = await product.deleteOne({_id:req.params.id})
    resp.send(result);
});

app.get("/product/:id",async (req,resp) => {
    let result = await product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }
    else{
        resp.send({result:"No Record found"});
    }
    
})

app.put("/product/:id",async (req,resp) => {
    let result = await product.updateOne({_id:req.params.id},
    {
        $set : req.body
    }
    )
    resp.send(result);
    
})

app.get("/search/:key",verifyToken, async (req,resp) => {
    let result = await product.find({
        "$or": [
            {name : {$regex:req.params.key} },
            {company : { $regex: req.params.key}}
        ]
    });
    resp.send(result);
    
});

function verifyToken(req, resp, next){
    console.log("middleware called");
    next();
}

   


app.listen(5000);