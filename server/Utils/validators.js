export const throwErrorOnMissingField = (fields, data) => {
  fields.forEach((field) => {
    if (!data[field]) {
      throw new StockError(400, `${field} field is required!`);
    }
  });
};
