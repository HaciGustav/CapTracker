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

const LogsTable = ({logs}) => {
  const columnObj = {
    id: 1,
    timestamp: 1,
    level: 1,
    message: 1,
    meta: 1
  };

  const { sortedData, handleSort, columns } = useSortColumn(logs, columnObj);

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
              <Box sx={arrowStyle} onClick={() => handleSort("timestamp")}>
                <Typography variant="body" noWrap>
                  Timestamp
                </Typography>
                {columns.timestamp === 1 && <UpgradeIcon />}
                {columns.timestamp !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("level")}>
                <Typography variant="body" noWrap>
                  Level
                </Typography>
                {columns.level === 1 && <UpgradeIcon />}
                {columns.level !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("message")}>
                <Typography variant="body" noWrap>
                  Message
                </Typography>
                {columns.message === 1 && <UpgradeIcon />}
                {columns.message !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("meta")}>
                <Typography variant="body" noWrap>
                  Meta
                </Typography>
                {columns.meta === 1 && <UpgradeIcon />}
                {columns.meta !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((logs) => (
            <TableRow
              key={logs.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {logs.id}
              </TableCell>
              <TableCell align="center">{logs.timestamp}</TableCell>
              <TableCell align="center">{logs.level}</TableCell>
              <TableCell align="center">{logs.message}</TableCell>
              <TableCell align="center">{JSON.stringify(logs.meta)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
