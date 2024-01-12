import { UnauthenticatedError, BadRequestError } from "../error/CustomerError.js"
import { verifyJWT } from "../utils/tokenUtils.js"


export const authenticate=(req, res, next)=>{
const {token}=req.cookies

if(!token) throw new UnauthenticatedError("authentication invalid check token")
try {
    const {userId,role}= verifyJWT(token)
    const testUser = userId === '659e5d529dbac983dc91fbaa';
    req.user = { userId, role, testUser };
    next();
} catch (error) {
  throw new UnauthenticatedError("authentication invalid")
}
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('Unauthorized to access this route');
    }
    next();
  };
};
export const checkForTestUser=(req, res, next)=>{
if(req.user.testUser) throw new BadRequestError("Demo user  Reading only")
next()
}