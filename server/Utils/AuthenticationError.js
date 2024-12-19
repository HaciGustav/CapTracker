class AuthenticationError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "AuthenticationError";
    this.status = status;
  }
}
export default AuthenticationError;
