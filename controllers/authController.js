import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import  bcrypt  from 'bcryptjs';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { comparePassword } from '../utils/passwordUtils.js';
export const register = async (req, res) => {

  //checking if its first account created then its an admin
  const isFirstAccount = await User.countDocuments() === 0
  req.body.role = isFirstAccount?'admin':'user';

  // a random value that is added to the password before hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};



export const login = async(req, res) => {

    const user = await User.findOne({email: req.body.email});

    const validUser = user & await comparePassword(
      req.body.password,
      user.password
    )
    if(!validUser) throw new UnauthenticatedError('invalid credentials');


    res.send('login')
   
    
}