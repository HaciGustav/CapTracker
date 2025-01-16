import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MultiSelect from "@/components/MultiSelect";
import PurchaseModal from "@/components/modals/PurchaseModal";
import PurchaseTable from "@/components/tables/PurchasesTable";
import { getSession } from "next-auth/react";
import useStockCalls from "@/hooks/useStockCalls";

const Purchases = () => {
  const { purchases } = useSelector((state) => state.stock);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const { getPurchases } = useStockCalls();

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <>
      <PurchaseModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={setOpen}
      />

      <Typography variant="h4" color="error" mt={4} mb={4}>
        Purchases
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Purchase
      </Button>

      {purchases?.length > 0 && (
        <>
          <MultiSelect
            data1={purchases}
            data2={purchases}
            key1="brand"
            key2="product"
            firstNames={selectedBrands}
            setFirstNames={setSelectedBrands}
            setSecondNames={setSelectedProducts}
          />

          <PurchaseTable
            setOpen={setOpen}
            setInfo={setInfo}
            selectedProducts={selectedProducts}
            selectedBrands={selectedBrands}
          />
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
