class CustomApiError extends Error {
    constructor(message, statusCode) {
        super(message); // it is coming from the Error object (message)
    }
}

export default CustomApiError;