class ResponseHandler {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
  toJSON() {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
}

export default ResponseHandler;
