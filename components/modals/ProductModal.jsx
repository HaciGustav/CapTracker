import React, { useEffect, useState } from "react";
import { flex, flexColumn, modalStyle } from "@/styles/globalStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import useStockCalls from "@/hooks/useStockCalls";

export default function ProductModal({
  open,
  setOpen,
  info,
  setInfo,
  allowSetTreshold,
}) {
  const { categories, brands } = useSelector((state) => state.stock);

  const [categoryList, setCategoryList] = useState(categories);
  const [brandList, setBrandList] = useState(brands);
  const { postProduct, putProduct, deleteProduct, getProducts } =
    useStockCalls();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info?.id) {
      putProduct(info).then(() => getProducts());
    } else {
      postProduct(info).then(() => getProducts());
    }
    setOpen(false);
  };

  const handleDelete = () => {
    deleteProduct(info?.id);
    setOpen(false);
  };

  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }
    if (brands) {
      setBrandList(brands);
    }
  }, [brands, categories]);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setInfo({});
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component="form" onSubmit={handleSubmit}>
          <Box sx={flex}>
            <FormControl fullWidth>
              <InputLabel variant="outlined" id="category-select">
                Category
              </InputLabel>
              <Select
                labelId="category-select"
                label="Category"
                id="category-select"
                name="categoryId"
                value={info?.categoryId || ""}
                onChange={handleChange}
                required
              >
                {categoryList?.map((category) => {
                  return (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel variant="outlined" id="brand-select">
                Brands
              </InputLabel>
              <Select
                labelId="brand-select"
                label="Brand"
                id="brand-select"
                name="brandId"
                value={info?.brandId || ""}
                onChange={handleChange}
                required
              >
                {brandList?.map((brand) => {
                  return (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <TextField
            margin="dense"
            fullWidth
            label="Product Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={info?.name || ""}
            onChange={handleChange}
            required
          />

          <Box sx={flex}>
            <TextField
              label="Price"
              id="price"
              type="number"
              variant="outlined"
              name="price"
              value={info?.price || ""}
              onChange={handleChange}
              InputProps={{ inputProps: { min: 0, step: "0.01" } }}
              fullWidth
              required
            />
            <TextField
              label="Stock"
              id="stock"
              type="number"
              variant="outlined"
              name="stock"
              value={info?.stock || ""}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>

          <Box sx={flex}>
            <TextField
              label="Minimum Stock"
              id="minimum"
              type="number"
              variant="outlined"
              name="min"
              InputProps={{ inputProps: { min: 0 } }}
              value={info?.min || ""}
              onChange={handleChange}
              fullWidth
              disabled={!allowSetTreshold}
            />
            <TextField
              label="Maximum Stock"
              id="maximum"
              type="number"
              variant="outlined"
              name="max"
              InputProps={{ inputProps: { min: 0 } }}
              value={info?.max || ""}
              onChange={handleChange}
              fullWidth
              disabled={!allowSetTreshold}
            />
          </Box>
          <Box sx={flex}>
            <Button variant="contained" size="large" type="submit" fullWidth>
              {info?.id ? "Update Product" : "Add New Product"}
            </Button>
            {info?.id && (
              <Button
                onClick={handleDelete}
                variant="contained"
                size="large"
                color="error"
                fullWidth
              >
                Delete Product
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
