import { Box, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const TransactionsFilter = ({ transactions, setFilteredData, categories }) => {
  const [filterValues, setFilterValues] = useState({
    searchTerm: "",
    selectedCategory: "",
    minQuantity: 0,
    maxQuantity: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const tempValues = { ...filterValues, [name]: value };
    setFilterValues(tempValues);
    console.log(filterValues);
    handlefilter(tempValues);
  };

  const handlefilter = (filterValues) => {
    const tmp = transactions
      .filter(
        (item) =>
          item.product.toLowerCase().includes(filterValues.searchTerm) ||
          item.brand.toLowerCase().includes(filterValues.searchTerm)
      )
      .filter(
        (item) =>
          !filterValues.selectedCategory ||
          item.category === filterValues.selectedCategory
      )
      .filter((item) =>
        filterValues.minQuantity
          ? item.quantity >= Number(filterValues.minQuantity)
          : true
      )
      .filter((item) =>
        filterValues.maxQuantity
          ? item.quantity <= Number(filterValues.maxQuantity)
          : true
      );
    setFilteredData(tmp);
  };

  useEffect(() => {
    handlefilter(filterValues);
  }, [transactions]);

  return (
    <Box sx={{ display: "flex", gap: 2, marginBlock: "10px" }}>
      <TextField
        label="Search"
        variant="outlined"
        name="searchTerm"
        value={filterValues.searchTerm || ""}
        onChange={handleChange}
        fullWidth
        size="small"
      />
      <Select
        value={filterValues.selectedCategory || ""}
        onChange={handleChange}
        name="selectedCategory"
        displayEmpty
        fullWidth
        size="small"
      >
        <MenuItem value="">All Categories</MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
      <TextField
        label="Min Quantity"
        type="number"
        name="minQuantity"
        variant="outlined"
        value={filterValues.minQuantity || ""}
        onChange={handleChange}
        fullWidth
        size="small"
      />
      <TextField
        label="Max Quantity"
        type="number"
        name="maxQuantity"
        variant="outlined"
        value={filterValues.maxQuantity || ""}
        onChange={handleChange}
        fullWidth
        size="small"
      />
    </Box>
  );
};

export default TransactionsFilter;
