

class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "", data, success) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.errors = errors;
      this.data = null;
      this.success = false;
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
}

export { ApiError };
