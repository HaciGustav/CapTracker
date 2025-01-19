import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import useSortColumn from "@/hooks/useSortColumn";
import { arrowStyle, btnHoverStyle } from "@/styles/globalStyle";
import { useSelector } from "react-redux";
import TableFilter from "../filters/ProductsFilter";

const ProductsTable = ({ setOpen, setInfo }) => {
  const { products } = useSelector((state) => state.stock);

  const columnObj = {
    category: 1,
    brand: 1,
    name: 1,
    stock: 1,
    price: 1,
    id: 1,
  };

  const { sortedData, handleSort, columns } = useSortColumn(
    products,
    columnObj
  );
  const [filteredData, setFilteredData] = useState(sortedData);

  const categoriesForFilter = [
    ...new Set(products.map((item) => item.category)),
  ];

  const handleDoubleClick = (e, info) => {
    if (e.detail < 2) return;
    setInfo(info);
    setOpen(true);
  };

  return (
    <Box>
      <TableFilter
        products={sortedData}
        setFilteredData={setFilteredData}
        categories={categoriesForFilter}
      />

      {/* Table */}
      <TableContainer component={Paper} elevation={10}>
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
                <Box sx={arrowStyle} onClick={() => handleSort("name")}>
                  <Typography variant="body" noWrap>
                    Product Name
                  </Typography>
                  {columns.name === 1 && <UpgradeIcon />}
                  {columns.name !== 1 && <VerticalAlignBottomIcon />}
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
              <TableCell align="center">
                <Box sx={arrowStyle} onClick={() => handleSort("stock")}>
                  <Typography variant="body" noWrap>
                    Stock
                  </Typography>
                  {columns.stock === 1 && <UpgradeIcon />}
                  {columns.stock !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body" noWrap>
                  Minimum
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body" noWrap>
                  Maximum
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box sx={arrowStyle} onClick={() => handleSort("price")}>
                  <Typography variant="body" noWrap>
                    Price
                  </Typography>
                  {columns.price === 1 && <UpgradeIcon />}
                  {columns.price !== 1 && <VerticalAlignBottomIcon />}
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((product) => (
              <TableRow
                key={product.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={(e) => handleDoubleClick(e, product)}
              >
                <TableCell align="center" component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.brand}</TableCell>
                <TableCell align="center">{product.category}</TableCell>
                <TableCell align="center">{product.stock}</TableCell>
                <TableCell align="center">{product.min}</TableCell>
                <TableCell align="center">{product?.max}</TableCell>
                <TableCell align="center">${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductsTable;
