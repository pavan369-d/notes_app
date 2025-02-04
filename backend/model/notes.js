const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        default:[]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to User model
    }
    
       
},{timestamps:true})

module.exports = mongoose.model('UserNotes',notesSchema)