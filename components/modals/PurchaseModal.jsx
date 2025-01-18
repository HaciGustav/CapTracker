import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";
import { flexColumn, modalStyle } from "@/styles/globalStyle";
import { useRouter } from "next/router";
import useStockCalls from "@/hooks/useStockCalls";
import { transactionTypes } from "@/helper/enums";

export default function ModalPurchase({ open, setOpen, info, setInfo }) {
  const router = useRouter();
  const { brands, products } = useSelector((state) => state.stock);
  const { postTransaction } = useStockCalls();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: Number(value) });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postTransaction({ ...info, transaction_type: transactionTypes.PURCHASE });
    setOpen(false);
    setInfo({});
  };

  const filteredProducts = useMemo(
    () =>
      info.brandId
        ? products.filter((p) => p.brandId === info.brandId)
        : products,
    [products, info?.brandId, info?.id]
  );
  console.log(info);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel variant="outlined" id="brand-select-label">
              Brand
            </InputLabel>
            <Select
              labelId="brand-select-label"
              label="Brand"
              id="brand-select"
              name="brandId"
              value={info?.brandId || ""}
              onChange={handleChange}
              required
            >
              <MenuItem onClick={() => router.push("/brands")}>
                Add New Brand
              </MenuItem>
              <hr />
              {brands?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel variant="outlined" id="product-select-label">
              Product
            </InputLabel>
            <Select
              labelId="product-select-label"
              label="Product"
              id="product-select"
              name="productId"
              value={info?.productId || ""}
              onChange={handleChange}
              required
            >
              <MenuItem onClick={() => router.push("/products")}>
                Add New Product
              </MenuItem>
              <hr />
              {filteredProducts?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            id="quantity"
            name="quantity"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.quantity || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Price"
            id="price"
            type="number"
            variant="outlined"
            name="price"
            InputProps={{ inputProps: { min: 0, step: "0.01" } }}
            value={info?.price || ""}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" size="large">
            {info?.id ? "Update Purchase" : "Add New Purchase"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
