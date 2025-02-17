import {body, validationResult } from 'express-validator'

import { BadRequestError } from '../errors/customErrors.js'

const withValidationErrors = (validateValues) => {

    return [
        validateValues, 
        (  req, res, next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const errorMessages = errors.array().map((error) => error.msg);
      throw new BadRequestError(errorMessages)
    }
    next()
  },
    ];

}


export const validateTest = withValidationErrors([
body('name')// validaton starts here , checking if name is in request
  .notEmpty() //ensure name is not empty
  .withMessage('name is required')
  .isLength({min:3, max:50})
  .withMessage('name must be at betweem 3 chars and 50 chars')
  .trim(),
]);