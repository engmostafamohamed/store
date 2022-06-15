import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import db from './database'
// console.log(config);
const app=express();
//middleware to parse incaming request
app.use(express.json());
//http security  middleware
app.use(helmet())
//apply rateLimit
app.use(
    rateLimit({
        windowMs:60*1000,//15 minute
        max:2,//number of repeate the get request
        standardHeaders:true,
        legacyHeaders:false,
        message:"Too many request to this IP"//error message
    })
);

//http request logger middleware
app.use(morgan('common'));
const port=config.port||3000;
//add  route
app.get('/',(req,res)=>{
    // console.log('Hello world')
    throw new Error("Error occure ooooo");
    
    res.json({
        message:"hello World"
    })
})
//post request
app.post('/',(req,res)=>{
    
    console.log(req.body);
    res.json({
        message:"hello World",
        data:req.body,
    });
});
//test database
db.connect().then((client)=>{
    return client.query('SELECT NOW()').then((res)=>{
        client.release();
        console.log(res.rows);
    }).catch((err)=>{
        client.release,
        console.log(err.stack);
    });
});
app.use(errorMiddleware);
app.use((_req,res)=>{
    res.status(404).json({
        message:'OOh is route not found',
    })
})
//add server
app.listen(port,()=>{
    console.log(`server is starting at port:${port}`);
});
export default app;