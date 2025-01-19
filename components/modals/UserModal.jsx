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
import { flex, flexColumn, modalStyle } from "@/styles/globalStyle";
import { useRouter } from "next/router";
import useAdminCalls from "@/hooks/useAdminCalls";

export default function ModalUser({ open, setOpen, info, setInfo }) {
  const router = useRouter();
  const { postUser, deleteUser, getUsers } = useAdminCalls();

  const userRoles = [
    { label: "Admin", key: 1 },
    { label: "Manager", key: 2 },
    { label: "Staff", key: 3 },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    postUser(info).then(() => getUsers());
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
    setInfo({});
  };

  const handleDelete = () => {
    deleteUser(info?.id).then(() => getUsers());
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <Box sx={flex}>
            <TextField
              label="Firstname"
              id="firstname"
              name="firstname"
              type="text"
              variant="outlined"
              value={info?.firstname || ""}
              onChange={handleChange}
              required
              fullWidth
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
              fullWidth
            />
          </Box>
          <Box sx={flex}>
            <TextField
              label="Username"
              id="username"
              name="username"
              type="text"
              variant="outlined"
              value={info?.username || ""}
              onChange={handleChange}
              required
              fullWidth
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
          </Box>
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

          {!info?.id && (
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
          )}

          <Box sx={flex}>
            <Button type="submit" variant="contained" size="large" fullWidth>
              {info?.id ? "Update User" : "Add New User"}
            </Button>
            {info?.id && (
              <Button
                onClick={handleDelete}
                variant="contained"
                size="large"
                color="error"
                fullWidth
              >
                Delete User
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
