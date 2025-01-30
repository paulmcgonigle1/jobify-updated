import express from 'express'
const app = express()
import morgan from 'morgan';


app.use(morgan('dev'))

app.use(express.json())

app.get('/', (req, res)=> {
    res.send('Hello World');

});

app.post('/',  (req, res) => {
    console.log(req);
    res.json({message: 'data receieved', data: req.body})
})

app.listen(5100, ()=> {
    console.log('server running... ')
})


