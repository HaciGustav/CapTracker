class StockError extends Error {
  constructor(status, message) {
    super(message);
    this.type = "custom";
    this.name = "StockError";
    this.status = status;
  }
}
export default StockError;
