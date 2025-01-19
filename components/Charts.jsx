import React, { useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  ChartsXAxis,
  ChartsYAxis,
  LineChart,
  LinePlot,
  MarkPlot,
} from "@mui/x-charts";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock.transactions);

  const dateFormatter = (date) => new Date(date).toLocaleDateString("en-GB");

  const salesData = sales?.map((item) => ({
    date: dateFormatter(item.createdAt),
    sales: Number(item.price_total),
  }));

  const purchasesData = purchases?.map((item) => ({
    date: dateFormatter(item.createdAt),
    purchases: Number(item.price_total),
  }));

  return (
    <Grid container justifyContent="center" spacing={2} mt={3}>
      <Grid item xs={12} sm={12} md={6}>
        <Card sx={{ p: 1, width: "100%", height: 350 }}>
          <Typography>Daily Purchase (USD)</Typography>
          <ResponsiveChartContainer
            series={[
              {
                data: salesData.map((el) => el.sales),
                label: "sales",
                type: "line",
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: salesData.map((el) => el.date),
                id: "x-axis-id",
              },
            ]}
          >
            <LinePlot />
            <MarkPlot />
            <ChartsXAxis position="bottom" axisId="x-axis-id" />
            <ChartsYAxis />
          </ResponsiveChartContainer>
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card sx={{ p: 1, width: "100%", height: 350 }}>
          <Typography>Daily Purchase (USD)</Typography>
          <ResponsiveChartContainer
            series={[
              {
                data: purchasesData.map((el) => el.purchases),
                label: "purchases",
                type: "line",
                color: "#e10000",
              },
            ]}
            xAxis={[
              {
                scaleType: "point",
                data: purchasesData.map((el) => el.date),
                id: "x-axis-id",
              },
            ]}
          >
            <LinePlot />
            <MarkPlot />
            <ChartsXAxis position="bottom" axisId="x-axis-id" />
            <ChartsYAxis />
          </ResponsiveChartContainer>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
