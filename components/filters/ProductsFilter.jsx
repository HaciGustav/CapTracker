import { Box, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const ProductsFilter = ({ products, setFilteredData, categories }) => {
  const [filterValues, setFilterValues] = useState({
    searchTerm: "",
    selectedCategory: "",
    minStock: 0,
    maxStock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const tempValues = { ...filterValues, [name]: value };
    setFilterValues(tempValues);
    console.log(filterValues);
    handlefilter(tempValues);
  };

  const handlefilter = (filterValues) => {
    const tmp = products
      .filter(
        (item) =>
          item.name.toLowerCase().includes(filterValues.searchTerm) ||
          item.brand.toLowerCase().includes(filterValues.searchTerm)
      )
      .filter(
        (item) =>
          !filterValues.selectedCategory ||
          item.category === filterValues.selectedCategory
      )
      .filter((item) =>
        filterValues.minStock
          ? item.stock >= Number(filterValues.minStock)
          : true
      )
      .filter((item) =>
        filterValues.maxStock
          ? item.stock <= Number(filterValues.maxStock)
          : true
      );
    setFilteredData(tmp);
  };

  useEffect(() => {
    handlefilter(filterValues);
  }, [products]);

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
        label="Min Stock"
        type="number"
        name="minStock"
        variant="outlined"
        value={filterValues.minStock || ""}
        onChange={handleChange}
        fullWidth
        size="small"
      />
      <TextField
        label="Max Stock"
        type="number"
        name="maxStock"
        variant="outlined"
        value={filterValues.maxStock || ""}
        onChange={handleChange}
        fullWidth
        size="small"
      />
    </Box>
  );
};

export default ProductsFilter;
