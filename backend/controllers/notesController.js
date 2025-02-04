const UserNotes  = require('../model/notes')
const createNotes = async(req,res)=>{
    const {title,content,images} = req.body;
    const user_id = req.user_id;
    if(!content){
        return res.status(400).json({error:'Notes cannot be empty!'})
    }
    try{
        const formattedImages = Array.isArray(images) ? images : [images]; 

        const notes = await UserNotes.create({
            title,
            content,
            images: formattedImages,
           
            user_id
        });
        res.status(201).json(notes);
    }catch(error){
        console.log(error);
        res.status(404).json({error:'Notes cannot be created!',error});
    }
}

const getNotes = async(req,res)=>{
    const user_id = req.user_id;
    console.log(user_id)
    console.log('user_id:',user_id);
    try{
        const notes = await UserNotes.find({user_id}).sort({createdAt:-1});
        
    if (!notes.length) {
        console.log(notes,'notescontroller')
        return res.status(404).json({ message: "No notes found" });
      }
      
        res.status(200).json(notes);
    }catch(error){
        console.log(error);
        res.status(400).json({error:'Cannot get notes!',error})
    }
}

const updateNotes = async(req,res)=>{
    
    const {id} = req.params;
    const update = req.body;
    try{
        const updatedNote = await UserNotes.findByIdAndUpdate(id,update,{new:true});

        res.status(201).json(updatedNote);
    }catch(error){
        res.status(400).json({error:'Cannot update notes!',error})
    }
}

const getNote = async(req,res)=>{
   
    const {id} = req.params;

    try{
        const note = await UserNotes.findById(id);
        res.status(200).json(note);
    }catch(error){
        res.status(400).json({error:'Cannot get notes',error})
    }
}

const deleteNote = async(req,res)=>{
   
    const {id} = req.params;
    try{
        const note = await UserNotes.findByIdAndDelete(id);
    }catch(error){
        res.status(400).json({error:'Cannot delete notes',error})
    }
}
module.exports = {
    createNotes,
    getNotes,
    getNote,
    updateNotes,
    deleteNote
}