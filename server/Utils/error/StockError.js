class StockError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "StockError";
    this.status = status;
  }
}
export default StockError;
