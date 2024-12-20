import { Typography, Box, Grid, Alert, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BrandCard from "@/components/BrandCard";
import BrandModal from "@/components/modals/BrandModal";
import { flexCenter } from "@/styles/globalStyle";
import { getCookie } from "cookies-next";

const Brands = () => {
  const { brands, loading } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  return (
    <Box>
      <Typography variant="h4" color="error" mb={2}>
        Brands
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Brand
      </Button>

      <BrandModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />

      {!loading && !brands?.length && (
        <Alert severity="warning" sx={{ mt: 4, width: "50%" }}>
          There is no brand to show
        </Alert>
      )}

      {brands?.length > 0 && (
        <Grid container sx={flexCenter} mt={4}>
          {brands?.map((brand) => (
            <Grid item key={brand.id}>
              <BrandCard brand={brand} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Brands;
export const getServerSideProps = async ({ req, res }) => {
  const token = await getCookie("token", { req, res, httpOnly: true });
  console.log({ token });
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
