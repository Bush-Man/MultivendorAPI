export const createError = (status, message) => {
    let err = new Error();
    err.status = status;
    err.message = message;
    return err;
    
}









// class CreateError extends Error {
//   httpStatusCode;
//   timestamp;
//   documentationUrl;

//   constructor(httpStatusCode, message, documentationUrl) {
//     if (message) {
//       super(message);
//     } else {
//       super("A generic error occurred!");
//     }

//     // initializing the class properties
//     this.httpStatusCode = httpStatusCode;
//     this.timestamp = new Date().toISOString();
//     this.documentationUrl = documentationUrl;

//     // attaching a call stack to the current class,
//     // preventing the constructor call to appear in the stack trace
//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export default  {
//   createError: CreateError,
// };
