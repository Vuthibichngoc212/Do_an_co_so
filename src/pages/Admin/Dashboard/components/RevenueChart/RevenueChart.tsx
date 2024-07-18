import { LineChart } from "@mui/x-charts/LineChart";
import { Paper, CardContent, CardHeader } from "@mui/material";

// Define the type for revenue data
type RevenueData = {
  day: string;
  revenue: number;
};

// Sample data for revenue
const daysOfWeek: Date[] = [
  new Date(2024, 6, 1), // Monday
  new Date(2024, 6, 2), // Tuesday
  new Date(2024, 6, 3), // Wednesday
  new Date(2024, 6, 4), // Thursday
  new Date(2024, 6, 5), // Friday
  new Date(2024, 6, 6), // Saturday
  new Date(2024, 6, 7), // Sunday
];

const revenueData: RevenueData[] = [
  { day: "Monday", revenue: 500 },
  { day: "Tuesday", revenue: 700 },
  { day: "Wednesday", revenue: 800 },
  { day: "Thursday", revenue: 600 },
  { day: "Friday", revenue: 900 },
  { day: "Saturday", revenue: 1100 },
  { day: "Sunday", revenue: 1000 },
];

const RevenueChart: React.FC = () => {
  return (
    <Paper
      sx={{
        borderRadius: 7,
        boxShadow: "#00000014 0px 3px 14px 0px",
        border: "1px solid #eee",
      }}
    >
      <CardHeader title="Weekly Revenue Chart" />
      <CardContent>
        <LineChart
          xAxis={[
            {
              id: "DaysOfWeek",
              data: daysOfWeek,
              scaleType: "time",
              valueFormatter: (date: Date): string =>
                date.toLocaleDateString("en-US", { weekday: "long" }),
            },
          ]}
          series={[
            {
              id: "Revenue",
              label: "Revenue",
              data: revenueData.map((item) => item.revenue),
              stack: "total",
              area: true,
              showMark: true,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ]}
          width={600}
          height={400}
          margin={{ left: 70 }}
        />
      </CardContent>
    </Paper>
  );
};

export default RevenueChart;
