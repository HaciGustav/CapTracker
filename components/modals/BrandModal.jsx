import React from "react";
import { flexColumn, modalStyle } from "@/styles/globalStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import useStockCalls from "@/hooks/useStockCalls";

export default function BrandModal({ open, setOpen, info, setInfo }) {
  const { postBrand, putBrand, getBrands } = useStockCalls();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info);
    if (info?.id) {
      putBrand(info);
    } else {
      postBrand(info);
    }

    setOpen(false);
    setInfo({});
  };

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
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <TextField
            label="Brand Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={info?.name || ""}
            onChange={handleChange}
            required
          />

          <TextField
            label="Image Url"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={info?.image || ""}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" size="large">
            {info?.id ? "Update Brand" : "Add New Brand"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
