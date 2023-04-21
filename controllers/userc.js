const { response } = require('express')
const User=require('../models/userm')
const Emp=require('../models/details')
const bcrypt =  require('bcryptjs')
const { check, validationResult } = require("express-validator");
const signup= async (req,res,next) => {
    const{name,email,password}=req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty())
    res.send("validation error: " + errors)
    else{
     let existingUser;
     try {
         existingUser = await User.findOne({name}) 
         }
         catch (error) {
             console.log(error);
         } 
         if(existingUser) {
              return res.json({message:'user exist'})  
         }
         else{
         const hashedPassword=bcrypt.hashSync(password)
         const user=new User({
                name,
                email,
                password:hashedPassword,
                
         }) ;
         
         try {
             await user.save();
             return res.send(user);
         }
         catch (error) {
             console.log(error);
         }
         
        }
    }
}
const login= async (req, res) => {
    const{email,password}=req.body;
        let user;
        try {
            user = await User.findOne({email})
        }
        catch (error) {
            console.log(error);
        }
        if(!user) {
           return res.json({message: "User not found"})
        }
        else{
        const isPasswordCorrect=bcrypt.compareSync(password, user.password)
        if(!isPasswordCorrect)
        {
                return res.status(200).json({message:"Incorrect password"})
        }
        else{
            return res.send('sign in success')
        }
    }
}
const create= async(req,res)=>{

const{name,age,mobile,department,salary}=req.body
const emp=new Emp({name,age,mobile,department,salary})
try{
    await emp.save()
    return res.json({emp:emp})
}
catch(err){
    console.log(err)
}
}
const update= async(req,res)=>{
    const id = req.params.id
    const salary=req.body.salary
    const emp= await Emp.findById(req.params.id)
    if(!emp) return res.json({emp:"employee not found"})
    try{
    let emp=await Emp.findByIdAndUpdate(id,req.body)
    return res.json({emp:emp})
}
    catch(err){
        console.log(err)
    }
    try{
        await emp.save()
        //return res.json({msg:"employee deleted"})
    }
    catch(err){
        console.log(err)
    }
    
}
const delemp= async(req,res)=>{
    let id = req.params.id
    let emp;
    try{
    emp=await Emp.findByIdAndDelete(id)}
    
    catch(err){
        console.log(err)
    }
    try{
        
        return res.json({msg:"employee deleted"})
    }
    catch(err){
        console.log(err)
    }
}
const getall= async(req,res)=>{
    let employees = await Emp.find()
    return res.json({employees: employees})
}






module.exports ={signup,login,create,update,delemp,getall}
