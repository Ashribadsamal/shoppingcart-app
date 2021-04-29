import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js'
import orderRouter from './router/orderRouter.js';

dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shopping',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log("connection success to db")
}).catch((e)=>{
    console.log("No connection to db");
});



app.use('/api/users', userRouter)
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter)
app.get('/api/config/paypal',(req,res)=>{
    console.log("hii from paypal backend")
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

/*app.get('/api/products/:id',(req,res)=>{
    const product = data.products.find(x=> x._id === req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: 'product not found'});
    }
})*/

app.get("/",(req,res)=>{
    res.send('server is ready')
})

app.use((err,req,res,next)=>{
    res.status(500).send({message: err.message})
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static("frontend/build"))
}


app.listen(port,()=>{
    console.log(`server is running on port ${5000}`)
})