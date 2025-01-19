import BaseError from "./BaseError";

class AuthenticationError extends BaseError {
  constructor(status, message) {
    super(status, message);
    this.type = "custom";

    this.name = "AuthenticationError";
    this.status = status;
  }
}
export default AuthenticationError;
