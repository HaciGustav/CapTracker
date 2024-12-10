import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import { flexCenter } from "../styles/globalStyle";
import Box from "@mui/material/Box";

const MultiSelect = (props) => {
  const {
    data1,
    data2,
    key1,
    key2,
    firstNames,
    setFirstNames,
    setSecondNames,
  } = props;

  return <Box sx={flexCenter} mt={3}></Box>;
};

export default MultiSelect;
