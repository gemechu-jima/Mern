import { StatusCodes } from "http-status-codes";


function ErrorHandlerMiddleware(err, req, res, next) {
    const statusCode=err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const msg=err.message || "Something error happen "
    res.status(statusCode).json({msg})
  
}

export default ErrorHandlerMiddleware