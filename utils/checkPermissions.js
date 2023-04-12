import { UnauthenticatedError } from '../errors/index.js';

const checkPermissions = (requestUser, resourceUserId) => {
    // if(requestUser.role === 'admin') return;

    // requestUser.userId is a string and resourceUserId is an object id. it comes from the database. So we should convert resourceUserId to string.
    if(requestUser.userId === resourceUserId.toString()) return
    throw new UnauthenticatedError('You are not authorized to perform this action');
}

export default checkPermissions;