class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
  toJSON() {
    return {
      success: false,
      message: this.message,
    };
  }
}

export default ErrorHandler;
