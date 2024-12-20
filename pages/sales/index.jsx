import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MultiSelect from "@/components/MultiSelect";
import SaleModal from "@/components/modals/SaleModal";
import SalesTable from "@/components/tables/SalesTable";
import { getCookie } from "cookies-next";

const Sales = () => {
  const { sales } = useSelector((state) => state.stock);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  return (
    <>
      <Typography variant="h4" color="error" mt={4} mb={4}>
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
