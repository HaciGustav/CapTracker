class BaseError extends Error {
  constructor(status, message) {
    super(message);
    this.type = "base";

    this.name = "BaseError";
    this.status = status;
  }
}
export default BaseError;
