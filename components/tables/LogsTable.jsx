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
import LogModal from "../modals/LogModal";

const LogsTable = ({ setOpen, setInfo, logs }) => {
  const columnObj = {
    id: 1,
    timestamp: 1,
    level: 1,
    message: 1,
    meta: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(logs, columnObj);
  const formatDateTime = (date) => {
    return `${new Date(date).toLocaleDateString("tr")}-
    ${new Date(date).toLocaleTimeString("tr")}`;
  };

  const handleDoubleClick = (e, info) => {
    if (e.detail > 1) {
      setOpen(true);
      setInfo(info);
    }
  };
  const cutCellValue = (value) =>
    value.length > 50 ? `${value.substring(0, 50)}...` : value;

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
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
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("level")}>
                <Typography variant="body" noWrap>
                  Level
                </Typography>
                {columns.level === 1 && <UpgradeIcon />}
                {columns.level !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((log) => (
            <TableRow
              key={log.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={(e) => handleDoubleClick(e, log)}
            >
              <TableCell align="center" component="th" scope="row">
                {log.id}
              </TableCell>
              <TableCell align="center">
                {formatDateTime(log.timestamp)}
              </TableCell>
              <TableCell align="center">
                {/* {log.message.substring(0, 25)}... */}
                {cutCellValue(log.message)}
              </TableCell>
              <TableCell align="center">
                {cutCellValue(JSON.stringify(log.meta))}
              </TableCell>
              <TableCell align="center">{log.level}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
