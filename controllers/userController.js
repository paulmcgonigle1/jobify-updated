import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
import JobModel from "../models/JobModel.js";

export const getCurrentUser = async (req, res) => {

    const user = await UserModel.findOne({_id: req.user.userId})
    const userWithoutPassword = user.toJSON();
    res.status(StatusCodes.OK).json({user: userWithoutPassword});

}
export const getApplicationStats = async (req, res) => {

    const users = await UserModel.countDocuments();
    const jobs = await JobModel.countDocuments();
    console.log(users);
    console.log(jobs);
    res.status(StatusCodes.OK).json({users, jobs});
    
}
export const updateUser = async (req, res) => {

    
    const obj = {...req.body};
    delete obj.password;//i can do this because of the function i put in models
    console.log(obj);
    const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, obj)
    res.status(StatusCodes.OK).json({msg: 'user updated'});
    
}