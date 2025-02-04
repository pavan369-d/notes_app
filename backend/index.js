const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoute')

dotenv.config();
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 8000

const app = express();
app.use(express.json());
app.use(cors()) // middleware for json

mongoose.connect(MONGO_URI)
.then(()=>console.log('Connected to MONGODB'))
.catch(error=>console.log('Error connecting to MONGODB:'+error))


app.get('/',(req,res)=>{
    res.send('Hello')
})

app.use('/api/auth',authRoutes)
app.use('/api/notes/',notesRoutes)

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`);
})

