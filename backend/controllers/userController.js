const User = require('../model/users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const authenticationToken = async(_id)=>{
    const token = jwt.sign({_id}, process.env.SECRET_KEY,{expiresIn:'7d'})
    return token
}

const Signup = async(req,res)=>{
    const {name,email,password} = req.body;
    try{
       const user = await User.signup(name,email,password);

        
        const token = await authenticationToken(user._id)
        console.log('token:',token);
        res.status(201).json({success:true,user:{email,token}})
    }catch(error){
        console.log(error);
        res.status(400).json({success:false,message:error.message});

    }
 
}

const Login = async(req,res)=>{
    const {email,password} = req.body;
    try{
       
        const user = await User.login(email,password);

        const token = await authenticationToken(user._id);
        
        res.status(200).json({success:true, user:{email,token}})

    }catch(error){
        console.log(error);
        res.status(400).json({success:false,message:error.message})
    }

}

module.exports = {
    Signup,
    Login
}