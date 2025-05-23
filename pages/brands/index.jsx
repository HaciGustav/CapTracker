import { Typography, Box, Grid, Alert, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BrandCard from "@/components/BrandCard";
import BrandModal from "@/components/modals/BrandModal";
import { flexCenter } from "@/styles/globalStyle";
import { getSession } from "next-auth/react";
import useStockCalls from "@/hooks/useStockCalls";

const Brands = () => {
  const { getBrands } = useStockCalls();
  const { brands, loading } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <Box>
      <Typography variant="h4" color="error" mb={2} 
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase"
        }}>
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

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
