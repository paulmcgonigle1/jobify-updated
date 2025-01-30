import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()

//using morgan is middleware to help debug
import morgan from 'morgan';

 if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))

 }

app.use(express.json())




app.get('/', (req, res)=> {
    res.send('Hello World');

});

app.post('/',  (req, res) => {
    console.log(req);
    res.json({message: 'data receieved', data: req.body})
})

//get all jobs api
app.get('/api/v1/jobs',);

//CREATE JOB API
app.post('/api/v1/jobs', );

//GET SINGLE JOB
app.get('/api/v1/jobs/:id', );
//EDIT JOB

app.patch('/api/v1/jobs/:id', )

//Delete JOB

app.delete('/api/v1/jobs/:id', );



//if anybody tries to use resource that is not availabel
app.use('*', (req,res) => {
  res.status(404).json({msg:'not found'})
})
//another not available error middleware - this gets triggered by existing controllers
app.use((err, req,res,next) => {
  console.log(err)
  res.status(404).json({msg:'not found'})
})
const port = process.env.PORT || 5100

app.listen(port, ()=> {
    console.log(`server running on port ${port}  `)
})


