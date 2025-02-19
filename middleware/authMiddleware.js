import { UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
    
     const { token } = req.cookies;
    if (!token) {
         throw new UnauthenticatedError('No token provided'); // More specific message
    }

    //i was failing when getting a console.log here
    try {
        const { userId, role } = verifyJWT(token);
        req.user = { userId, role }; 

       next();
    } catch (error) {

        console.error("JWT Verification Error:", error);

        // 2. Enhance the error message (optional but recommended):
        let errorMessage = "Authentication failed: ";

        if (error.name === 'TokenExpiredError') {
            errorMessage += "Token expired";
        } else if (error.name === 'JsonWebTokenError') {
            errorMessage += "Invalid token"; // Could be signature, malformed, etc.
            if (error.message.includes('invalid signature')) {
              errorMessage += " (invalid signature)"
            }

        } else {
            errorMessage += "Token verification failed"; // Generic message if other errors
           
        }
           errorMessage += `(${error.message})`


        // 3. Throw the UnauthenticatedError with the enhanced message:
        throw new UnauthenticatedError(errorMessage);    }
   
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};


export default authenticateUser;

