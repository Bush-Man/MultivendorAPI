// Define a custom success middleware
const successMiddleware = (req, res, next) => {
  // Define default success status and message
  const successStatus = 200;
  const successMessage = 'Success';

  // Create a function to send success responses
  res.sendSuccess = (status = successStatus, message = successMessage) => {
    res.status(status).json({ success: true, message });
  };

  // Move to the next middleware or route handler
  next();
};

export  default successMiddleware;
