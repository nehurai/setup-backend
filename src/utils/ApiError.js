class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
        this.stack = "";
        this.message = message;
        this.success = false;

        if(statck){
            this.stack = stack; 
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export default ApiError;