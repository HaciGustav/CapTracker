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
import useAdminCalls from "@/hooks/useAdminCalls";

export default function ModalUser({ open, setOpen, info, setInfo }) {
  const router = useRouter();
  const { postUser } = useAdminCalls();

  const userRoles = [{label: "Admin", key: 1}, 
    {label: "Manager", key: 2},
    {label: "Staff", key: 3}
  ]

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postUser({ ...info });
      setOpen(false);
      router.reload();
    } catch (error) {
      console.error("Error posting user:", error);
    }
  };
  

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <TextField
            label="Firstname"
            id="firstname"
            name="firstname"
            type="text"
            variant="outlined"
            value={info?.firstname || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Lastname"
            id="lastname"
            name="lastname"
            type="text"
            variant="outlined"
            value={info?.lastname || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Username"
            id="username"
            name="username"
            type="text"
            variant="outlined"
            value={info?.username || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="E-Mail"
            id="email"
            name="email"
            type="text"
            variant="outlined"
            value={info?.email || ""}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth>
            <InputLabel variant="outlined" id="category-select">
              Role
            </InputLabel>
            <Select
            labelId="user_role-select"
            label="Role"
            id="user_role-select"
            name="user_role"
            value={info?.user_role || ""}
            onChange={handleChange}
            required
            >
              {userRoles?.map((role) => {
                return (
                  <MenuItem key={role.key} value={role.key}>
                      {role.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            label="Password"
            id="password"
            name="password"
            type="password"
            variant="outlined"
            value={info?.password || ""}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" size="large">
            {info?.id ? "Update User" : "Add New User"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
