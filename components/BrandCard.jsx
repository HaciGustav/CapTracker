import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { CardHeader } from "@mui/material";
import { btnHoverStyle, flex } from "../styles/globalStyle";
import useStockCalls from "@/hooks/useStockCalls";

const BrandCard = ({ brand, setOpen, setInfo }) => {
  const { deleteBrand, getBrands } = useStockCalls();
  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader title={brand?.name} />

      <CardMedia
        image={brand?.image}
        sx={{ p: 1, objectFit: "contain", height: "250px" }}
        component="img"
        alt="brand-img"
      />

      <CardActions sx={flex}>
        <EditIcon
          sx={btnHoverStyle}
          onClick={() => {
            setInfo(brand);
            setOpen(true);
          }}
        />
        <DeleteOutlineIcon
          sx={btnHoverStyle}
          onClick={() => deleteBrand(brand.id).then(() => getBrands())}
        />
      </CardActions>
    </Card>
  );
};

export default BrandCard;
