// src/components/OrderChart.js

import { LineChart } from "@mui/x-charts/LineChart";
import { Paper, CardContent, CardHeader } from "@mui/material";

// Sample data for orders
const daysOfWeek = [
  new Date(2024, 6, 1), // Monday
  new Date(2024, 6, 2), // Tuesday
  new Date(2024, 6, 3), // Wednesday
  new Date(2024, 6, 4), // Thursday
  new Date(2024, 6, 5), // Friday
  new Date(2024, 6, 6), // Saturday
  new Date(2024, 6, 7), // Sunday
];

const orderData = [
  { day: "Monday", orders: 50 },
  { day: "Tuesday", orders: 70 },
  { day: "Wednesday", orders: 80 },
  { day: "Thursday", orders: 60 },
  { day: "Friday", orders: 90 },
  { day: "Saturday", orders: 110 },
  { day: "Sunday", orders: 100 },
];

export default function OrderChart() {
  return (
    <Paper
      sx={{
        borderRadius: 7,
        boxShadow: "#00000014 0px 3px 14px 0px",
        border: "1px solid #eee",
      }}
    >
      <CardHeader title="Weekly Orders Chart" />
      <CardContent>
        <LineChart
          xAxis={[
            {
              id: "DaysOfWeek",
              data: daysOfWeek,
              scaleType: "time",
              valueFormatter: (date) =>
                date.toLocaleDateString("en-US", { weekday: "long" }),
            },
          ]}
          series={[
            {
              id: "Orders",
              label: "Orders",
              data: orderData.map((item) => item.orders),
              stack: "total",
              area: true,
              showMark: true,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.2)",
            },
          ]}
          width={600}
          height={400}
          margin={{ left: 70 }}
        />
      </CardContent>
    </Paper>
  );
}
