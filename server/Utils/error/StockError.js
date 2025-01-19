import BaseError from "./BaseError";

class StockError extends BaseError {
  constructor(status, message) {
    super(status, message);
    this.type = "custom";
    this.name = "StockError";
    this.status = status;
  }
}
export default StockError;
