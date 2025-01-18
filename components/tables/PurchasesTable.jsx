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

const PurchasesTable = ({
  setOpen,
  setInfo,
  selectedProducts,
  selectedBrands,
}) => {
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

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minStock, setMinStock] = useState("");
  const [maxStock, setMaxStock] = useState("");

  const handleSearch = (event) =>
    setSearchTerm(event.target.value.toLowerCase());
  const handleCategoryChange = (event) =>
    setSelectedCategory(event.target.value);
  const handleMinStockChange = (event) => setMinStock(event.target.value);
  const handleMaxStockChange = (event) => setMaxStock(event.target.value);

  const isBrandSelected = (item) =>
    selectedBrands.includes(item.brand) || selectedBrands.length === 0;

  const isProductSelected = (item) =>
    selectedProducts.includes(item.product) || selectedProducts.length === 0;

  const formatDateTime = (date) => {
    return `${new Date(date).toLocaleDateString("tr")}-
    ${new Date(date).toLocaleTimeString("tr")}`;
  };

  const filteredData = sortedData
    .filter((item) => isBrandSelected(item))
    .filter((item) => isProductSelected(item))
    .filter(
      (item) =>
        item.product.toLowerCase().includes(searchTerm) ||
        item.brand.toLowerCase().includes(searchTerm)
    )
    .filter((item) => !selectedCategory || item.category === selectedCategory)
    .filter((item) => (minStock ? item.quantity >= Number(minStock) : true))
    .filter((item) => (maxStock ? item.quantity <= Number(maxStock) : true));

  return (
    <Box>
      {/* Filter Inputs */}
      <Box sx={{ display: "flex", gap: 2, marginBlock: "10px" }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          fullWidth
        />
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">All Categories</MenuItem>
          {[...new Set(purchases.map((item) => item.category))].map(
            (category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            )
          )}
        </Select>
        <TextField
          label="Min Stock"
          type="number"
          variant="outlined"
          value={minStock}
          onChange={handleMinStockChange}
        />
        <TextField
          label="Max Stock"
          type="number"
          variant="outlined"
          value={maxStock}
          onChange={handleMaxStockChange}
        />
      </Box>
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
              <TableCell align="center">Operation</TableCell>
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
                <TableCell>
                  <Box sx={flex}>
                    <BorderColorIcon
                      sx={btnHoverStyle}
                      onClick={() => {
                        setInfo(item);
                        setOpen(true);
                      }}
                    />

                    <DeleteForeverIcon sx={btnHoverStyle} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PurchasesTable;
