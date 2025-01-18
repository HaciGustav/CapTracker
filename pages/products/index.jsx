import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import ProductModal from "@/components/modals/ProductModal";
import ProductsTable from "@/components/tables/ProductsTable";
import { getSession } from "next-auth/react";
import useStockCalls from "@/hooks/useStockCalls";

const Products = () => {
  const { getProducts, getCategories, getBrands } = useStockCalls();
  const { products, brands, categories } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getProducts();

    if (!categories.length) {
      getCategories();
    }
    if (!brands.length) {
      getBrands();
    }
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        color="error"
        mb={2}
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Products
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
          setInfo({});
        }}
      >
        New Product
      </Button>

      <ProductModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      {products?.length > 0 && (
        <ProductsTable setOpen={setOpen} setInfo={setInfo} />
      )}
    </Box>
  );
};

export default Products;
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
