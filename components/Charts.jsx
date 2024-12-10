import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { LineChart } from "@mui/x-charts";

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const dataFormatter = (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  const salesData = sales?.map((item) => ({
    date: item.createds,
    sales: Number(item.price_total),
  }));

  const purchasesData = purchases?.map((item) => ({
    date: item.createds,
    purchases: Number(item.price_total),
  }));

  return (
    <Grid container justifyContent="center" spacing={2} mt={3}>
      <Grid item xs={12} sm={12} md={6}>
        <Card sx={{ p: 2 }}>
          <Typography>Daily Sales (USD)</Typography>

          <LineChart
            width={500}
            height={300}
            series={[{ data: salesData.map((el) => el.sales), label: "sales" }]}
            xAxis={[
              { scaleType: "point", data: salesData.map((el) => el.date) },
            ]}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card sx={{ p: 2 }}>
          <Typography>Daily Purchase (USD)</Typography>

          <LineChart
            width={500}
            height={300}
            series={[
              {
                data: purchasesData.map((el) => el.purchases),
                label: "purchases",
              },
            ]}
            xAxis={[
              { scaleType: "point", data: purchasesData.map((el) => el.date) },
            ]}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
