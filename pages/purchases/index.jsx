import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PurchaseModal from "@/components/modals/PurchaseModal";
import PurchaseTable from "@/components/tables/PurchasesTable";
import { getSession } from "next-auth/react";
import useStockCalls from "@/hooks/useStockCalls";

const Purchases = () => {
  const { purchases, products, categories, brands } = useSelector(
    (state) => state.stock
  );

  const { getPurchases, getCategories, getBrands, getProducts } =
    useStockCalls();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getPurchases();
    if (!products.length) {
      getProducts();
    }
    if (!categories.length) {
      getCategories();
    }
    if (!brands.length) {
      getBrands();
    }
  }, []);

  return (
    <>
      <PurchaseModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={setOpen}
      />

      <Typography
        variant="h4"
        color="error"
        mb={2}
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Purchases
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
          setInfo({});
        }}
      >
        New Purchase
      </Button>

      {purchases?.length > 0 && (
        <>
          <PurchaseTable setOpen={setOpen} setInfo={setInfo} />
        </>
      )}
    </>
  );
};

export default Purchases;
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
