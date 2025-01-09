import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MultiSelect from "@/components/MultiSelect";
import SaleModal from "@/components/modals/SaleModal";
import SalesTable from "@/components/tables/SalesTable";
import { getSession } from "next-auth/react";
import useStockCalls from "@/hooks/useStockCalls";

const Sales = () => {
  const { getSales } = useStockCalls();
  const { sales } = useSelector((state) => state.stock);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <Typography variant="h4" color="error" mb={2} 
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase"
        }}>
        Sales
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Sale
      </Button>

      <SaleModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={() => setOpen(false)}
      />

      {sales?.length > 0 && (
        <>
          <MultiSelect
            data1={sales}
            data2={sales}
            key1="brand"
            key2="product"
            firstNames={selectedBrands}
            setFirstNames={setSelectedBrands}
            setSecondNames={setSelectedProducts}
          />

          <SalesTable
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

export default Sales;

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
