import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.message);
    const defaultError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        // err.message is coming from the throw new Error('Please enter all fields'); in authController.js. message is coming from the Error object.
        msg: err.message || 'Something went wrong, please try again later!'
    };

    if (err.name === 'ValidationError') {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(err.errors).map((val) => val.message).join(',');
    }

    if (err.code === 11000) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = `${Object.keys(err.keyValue)} already exists`;
    }

    res.status(defaultError.statusCode).json({ msg: defaultError.msg })

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






// {
//     "msg": {
//         "index": 0,
//         "code": 11000,
//         "keyPattern": {
//             "email": 1
//         },
//         "keyValue": {
//             "email": "emirhan@gmail.com"
//         }
//     }
// }