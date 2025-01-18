import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import useSortColumn from "@/hooks/useSortColumn";
import { arrowStyle, btnHoverStyle } from "@/styles/globalStyle";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Password } from "@mui/icons-material";

const UsersTable = ({setOpen, setInfo, users}) => {
  const columnObj = {
    id: 1,
    firstname: 1,
    lastname: 1,
    username: 1,
    email: 1,
    user_role: 1,
    is_active: 1,
    createdAt: 1
  };

  const { sortedData, handleSort, columns } = useSortColumn(users, columnObj);

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("id")}>
                <Typography variant="body" noWrap>
                  #
                </Typography>
                {columns.id === 1 && <UpgradeIcon />}
                {columns.id !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("firstname")}>
                <Typography variant="body" noWrap>
                  Firstname
                </Typography>
                {columns.firstname === 1 && <UpgradeIcon />}
                {columns.firstname !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("lastname")}>
                <Typography variant="body" noWrap>
                  Lastname
                </Typography>
                {columns.lastname === 1 && <UpgradeIcon />}
                {columns.lastname !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("username")}>
                <Typography variant="body" noWrap>
                  Username
                </Typography>
                {columns.username === 1 && <UpgradeIcon />}
                {columns.username !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("email")}>
                <Typography variant="body" noWrap>
                  E-Mail
                </Typography>
                {columns.email === 1 && <UpgradeIcon />}
                {columns.email !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("user_role")}>
                <Typography variant="body" noWrap>
                  Role
                </Typography>
                {columns.user_role === 1 && <UpgradeIcon />}
                {columns.user_role !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("is_active")}>
                <Typography variant="body" noWrap>
                  Active
                </Typography>
                {columns.is_active === 1 && <UpgradeIcon />}
                {columns.is_active !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("createdAt")}>
                <Typography variant="body" noWrap>
                  Created At
                </Typography>
                {columns.createdAt === 1 && <UpgradeIcon />}
                {columns.createdAt !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((users) => (
            <TableRow
              key={users.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {users.id}
              </TableCell>
              <TableCell align="center">{users.firstname}</TableCell>
              <TableCell align="center">{users.lastname}</TableCell>
              <TableCell align="center">{users.username}</TableCell>
              <TableCell align="center">{users.email}</TableCell>
              <TableCell align="center">{users.user_role}</TableCell>
              <TableCell align="center">
                {users.is_active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell align="center">{users.createdAt}</TableCell>
              <TableCell align="center">
                  <BorderColorIcon
                    sx={btnHoverStyle}
                    onClick={() => {
                      setInfo(users);
                      setOpen(true);
                    }}
                  />
                  <DeleteForeverIcon sx={btnHoverStyle} />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
