const validator = require('validator')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema

const userSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true})


userSchema.statics.signup = async function(name,email,password){
    
        if(!email|| !password || !name){
            throw new Error('All fields must be filled');
        }

        if(!validator.isEmail(email)){
            throw new Error('Email is not valid');
        }

        if(!validator.isStrongPassword(password)){
            throw new Error('Password is not strong enough')
        }
        
        const exits = await this.findOne({email});
        if(exits){
            throw new Error('Email already in use')
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const user = await this.create({name, email, password:hashedPassword})
        
        return user;
        
    }

    userSchema.statics.login = async function (email,password){
        if(!email || !password){
            throw new Error('All fields must be filled');
        }

    

        const user = await this.findOne({email});
        if(!user){
            throw new Error('Email not found');
        }

        const isMatch =  bcrypt.compare(password,user.password);
      
        if(!isMatch){
            throw new Error('Invalid Password');
        }

        return user
    }
    module.exports = mongoose.model('User',userSchema);