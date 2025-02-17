import 'express-async-errors';

import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
const app = express()
//using morgan is middleware to help debug
import morgan from 'morgan';

//routers
import jobRouter from './routes/jobRouter.js'

 if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))

 }

app.use(express.json())

app.use(errorHandlerMiddleware);




app.get('/', (req, res)=> {
    res.send('Hello World');

});

app.post('/',  (req, res) => {
    console.log(req);
    res.json({message: 'data receieved', data: req.body})
})

app.use('/api/v1/jobs', jobRouter)


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


//USING mongoose as an abstraction layer and then listening after that
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

