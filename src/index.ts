import express from 'express';
const app=express();
const port=3000;
//add route
app.get('/',(req,res)=>{
    // console.log('Hello world')
    res.json({
        message:"hello World"
    })
})
//add server
app.listen(port,()=>{
    console.log(`server is starting at port:${port}`);
});
export default app;