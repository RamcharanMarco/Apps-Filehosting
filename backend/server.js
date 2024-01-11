const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const bucketRoutes = require('./routes/bucketRoutes')
const fileRoutes = require('./routes/fileRoutes')
const userRoutes = require('./routes/userRoutes')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/auth', authRoutes )
app.use('/api/buckets', bucketRoutes )
app.use('/api/file', fileRoutes )
app.use('/api/user', userRoutes )
app.use('/files', express.static('files'));
app.use('/zips', express.static('zips'));

app.use('/portfolios', express.static('portfolios'));
app.use('/linkbios', express.static('linkbios'));



app.get('/', (req, res)=>{
    res.send('file-hosting backend running')
})

mongoose.connect('mongodb+srv://marcomongo:mongomarco@marcosclusterno1.kzoqh.mongodb.net/File-hosting?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to the database')
})
.catch((error) => { console.log(error)})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
console.log('server running')
})