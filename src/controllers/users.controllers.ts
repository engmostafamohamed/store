import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';
import config from '../config';

const userModel = new UserModel();
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body);
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getMany = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getMany();
    res.json({
      status: 'success',
      data: users,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateOne(req.body);
    res.json({
      status: 'success',
      data: { user },
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteOne(req.params.id as unknown as string);
    res.json({
      status: 'success',
      data: user,
      message: 'User retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
};
export const authenticate=async(
  req: Request,
  res: Response,
  next: NextFunction
)=>{
  try {
    const {email,password}=req.body;
    const user=await userModel.authenticate(email,password);
    const token=jwt.sign({user},config.tokenSecret as unknown as string);
    if (! user) {
      return res.status(401).json({
        status:'error',
        message: 'the userName and Password do not match please try again'
      });
    }
    return res.json({
      status:'success',
      data:{...user,token},
      message: 'user authenticated successfully'
    });
  } catch (err) {
    return next(err);
  }
};




