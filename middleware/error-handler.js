import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const defaultError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: 'Something went wrong, please try again later!'
    };

    if (err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(err.errors).map((val) => val.message).join(',');
    }

    res.status(defaultError.statusCode).json({ msg: defaultError.msg })
    res.status(defaultError.statusCode).json({msg: err});

} 

export default errorHandlerMiddleware;








/////////////////////////////// Error Object ///////////////////////////////

// {
//     "msg": {
//         "errors": {
//             "password": {
//                 "name": "ValidatorError",
//                 "message": "Password is required",
//                 "properties": {
//                     "message": "Password is required",
//                     "type": "required",
//                     "path": "password"
//                 },
//                 "kind": "required",
//                 "path": "password"
//             },
//             "name": {
//                 "name": "ValidatorError",
//                 "message": "Name is required",
//                 "properties": {
//                     "message": "Name is required",
//                     "type": "required",
//                     "path": "name"
//                 },
//                 "kind": "required",
//                 "path": "name"
//             }
//         },
//         "_message": "User validation failed",
//         "name": "ValidationError",
//         "message": "User validation failed: password: Password is required, name: Name is required"
//     }
// }