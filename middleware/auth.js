import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    // console.log(req.cookies);  
    const token = req.cookies.token;
    if(!token) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
    

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(payload);
        req.user = { userId: payload.userId }
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

}

export default auth;