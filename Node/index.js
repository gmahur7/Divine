const express=require('express')
const cors=require('cors')
const Jwt = require('jsonwebtoken')
require('./Database/config')
const User =require('./Database/signup')
const Admin =require('./Database/admin')
const app=express()
app.use(cors())
app.use(express.json());
const jwtKey='arceus'

app.get('/',verifyJwt,async (req,resp)=>
{
    try{
        
    let data=await User.find()
    resp.send(data)
    }
    catch(error)
    {
        resp.send({msg:'error'})
    }
})

app.post('/signup',async(req,resp)=>
{
   try{
    let data=await new User(req.body)
    data= await data.save()
    resp.send(data)
   }
   catch(error)
   {
    resp.send({msg:'error'})
   }
})

app.post('/adminlogin',async (req,resp)=>
{
   try{
    let admin=await Admin.findOne(req.body).select('-password')
    if(admin){
    Jwt.sign({admin},jwtKey,{expiresIn:'24h'},(err,token)=>
    {
        if(!err) resp.send({admin,auth:token})
        else {resp.send({result:'Something Went Wrong'})}
    })}
    else resp.send({result:'No Admin Found'})
   }
   catch(error)
   {
    resp.send({msg:'error'})  
   }
})

app.get('/search/Name/:key',verifyJwt,async (req,resp)=>
{
    try{
        let result = await User.find({ Name: { $regex: req.params.key }})
    if(result) resp.send(result)
    else {
        resp.send({result:'No User Found'})
    }
    }
    catch(error)
    {
        resp.send({msg:'error'})  
    }
})
app.get('/search/Course/:key',verifyJwt,async (req,resp)=>
{   
   try{
    let result = await User.find({ Course: { $regex: req.params.key }})
    if(result) resp.send(result)
    else {
        resp.send({result:'No Course Found'})
    }
   }
   catch(error){
    resp.send({msg:'error'}) 
   }
})
app.get('/search/Profession/:key',verifyJwt,async (req,resp)=>
{
    try{
        let result = await User.find({ Profession: { $regex: req.params.key }})
    if(result) resp.send(result)
    else {
        resp.send({result:'No Profession Found'})
    }
    }
    catch(error){
        resp.send({msg:'error'})   
    }
})

app.get('/search/Admission/:key',verifyJwt,async (req,resp)=>
{
    try{
        let result = await User.find({ Admission: { $regex: req.params.key }})
    if(result) resp.send(result)
    else {
        resp.send({result:'No Admission Found'})
    }
    }
    catch(error)
    {
        resp.send({msg:'error'}) 
    }
})

app.get('/search/Created/:key',async (req,resp)=>
{
    try{
        let result = await User.find({ Created: { $regex: req.params.key }})
    if(result) resp.send(result)
    else resp.send({err:'Error'})
    }
    catch(error)
    {
        resp.send({msg:'error'})  
    }
})

app.get('/search/Created/greater/:key',async (req,resp)=>
{
   try{
    let result = await User.find({ Created: { $gte: req.params.key }})
    if(result) resp.send(result)
    else resp.send({err:'Error'})
   }
   catch(error)
   {
    resp.send({msg:'error'})  
   }
})
app.get('/search/Created/less/:key',async (req,resp)=>
{
   try{
    let result = await User.find({ Created: { $lte: req.params.key }})
    if(result) resp.send(result)
    else resp.send({err:'Error'})
   }
   catch(error)
   {
    resp.send({msg:'error'})
    }
})

app.post('/search/Created/btw/',verifyJwt,async (req,resp)=>
{
    try{
        let result = await User.find({'$and': [{ Created: { $gte: req.body.gt }},{Created:{$lte:req.body.lt}}]})
    if(result) resp.send(result)
    else resp.send({err:'Error'})
    }
    catch(error)
    {
        resp.send({msg:'error'}) 
    }
})

app.put('/update/:key',verifyJwt,async(req,resp)=>
{
    try{
        let result =await User.updateOne({_id:req.params.key},{$set:req.body})
    resp.send(result)
    }
    catch(error)
    {
        resp.send({msg:'error'}) 
    }

})

function verifyJwt(req,resp,next){
   try{
    let token=req.headers['authorization']
    if(token){
        token=token.split(" ")[1]
        Jwt.verify(token,jwtKey,(err,valid)=>
        {
            if(!err) next()
            else { resp.status(401).send({error : "Token Expired"})
        //  resp.clearCookie('token')
        }
        })
    }
    else{
        resp.status(400).send({err : "Please Enter Token"})
    }
   }
   catch(error)
   {
     resp.send({msg:'error'})
   }
}

app.listen(80,'127.0.0.1',()=>
{
    console.log("Server Is Running")
})

