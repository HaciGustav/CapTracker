import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import useSortColumn from "@/hooks/useSortColumn";
import { arrowStyle, btnHoverStyle, flex } from "@/styles/globalStyle";
import { useSelector } from "react-redux";
import TransactionsFilter from "../filters/TransactionsFilter";

const PurchasesTable = () => {
  const { purchases } = useSelector((state) => state.stock);

  const columnObj = {
    createdAt: 1,
    quantity: 1,
    price_total: 1,
    category: 1,
    price: 1,
    brand: 1,
    product: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(
    purchases,
    columnObj
  );
  const [filteredData, setFilteredData] = useState(sortedData);

  const categoriesForFilter = [
    ...new Set(purchases.map((item) => item.category)),
  ];

  const formatDateTime = (date) => {
    return `${new Date(date).toLocaleDateString("tr")}-${new Date(
      date
    ).toLocaleTimeString("tr")}`;
  };

  return (
    <Box>
      <TransactionsFilter
        transactions={sortedData}
        setFilteredData={setFilteredData}
        categories={categoriesForFilter}
      />

      <TableContainer component={Paper} elevation={10}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={arrowStyle} onClick={() => handleSort("createdAt")}>
                  <Typography variant="body" noWrap>
                    Date
                  </Typography>
                  {columns.createdAt === 1 && <UpgradeIcon />}
                  {columns.createdAt !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>
              {/* <TableCell align="center">Category</TableCell> */}
              <TableCell align="center">
                <Box sx={arrowStyle} onClick={() => handleSort("product")}>
                  <Typography variant="body" noWrap>
                    Product Name
                  </Typography>
                  {columns.product === 1 && <UpgradeIcon />}
                  {columns.product !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={arrowStyle} onClick={() => handleSort("brand")}>
                  <Typography variant="body" noWrap>
                    Brand
                  </Typography>
                  {columns.brand === 1 && <UpgradeIcon />}
                  {columns.brand !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Box sx={arrowStyle} onClick={() => handleSort("category")}>
                  <Typography variant="body" noWrap>
                    Category
                  </Typography>
                  {columns.category === 1 && <UpgradeIcon />}
                  {columns.category !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={arrowStyle} onClick={() => handleSort("quantity")}>
                  <Typography variant="body" noWrap>
                    Quantity
                  </Typography>
                  {columns.quantity === 1 && <UpgradeIcon />}
                  {columns.quantity !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={arrowStyle} onClick={() => handleSort("price")}>
                  <Typography variant="body" noWrap>
                    Amount
                  </Typography>
                  {columns.price === 1 && <UpgradeIcon />}
                  {columns.price !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={arrowStyle} onClick={() => handleSort("price_total")}>
                  <Typography variant="body" noWrap>
                    Price Total
                  </Typography>
                  {columns.price_total === 1 && <UpgradeIcon />}
                  {columns.price_total !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {formatDateTime(item?.createdAt)}
                </TableCell>
                <TableCell align="center">{item?.product}</TableCell>
                <TableCell align="center">{item?.brand}</TableCell>
                <TableCell align="center">{item?.category}</TableCell>
                <TableCell align="center">{item?.quantity}</TableCell>
                <TableCell align="center">{`$${item?.price}`}</TableCell>
                <TableCell align="center">{`$${item?.price_total}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PurchasesTable;
