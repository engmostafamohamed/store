import {Response,Request,NextFunction} from 'express';
import Error from '../interface/error.interface';
const errorMiddleware=(error:Error,req:Request,res:Response,next:NextFunction)=>{
    const status=error.status||500;
    console.log(error);
    const message=error.message||'whooPs Error Happend';
    res.status(status).json({status,message});
};
export default errorMiddleware