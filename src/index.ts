import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
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
const port=3000;
//add  route
app.get('/',(req,res)=>{
    // console.log('Hello world')
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
//add server
app.listen(port,()=>{
    console.log(`server is starting at port:${port}`);
});
export default app;