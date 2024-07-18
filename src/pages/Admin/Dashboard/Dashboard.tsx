import { Box, Typography, Grid } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import OrderChart from "./components/OrderChart/OrderChart";
import BasicCard from "./components/BasicCard/BasicCard";
import RevenueChart from "./components/RevenueChart/RevenueChart";
import HotOrder from "./components/HotOrder/HotOrder";

const Dashboard = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" color="initial">
          Dashboard
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard
            icon={AttachMoneyIcon}
            title="Total Revenue"
            value="1200"
            subtitle="5% increase vs last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard
            icon={PeopleAltOutlinedIcon}
            title="Total Customers"
            value="200"
            subtitle="5% increase vs last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <BasicCard
            icon={InventoryOutlinedIcon}
            title="Total Orders"
            value="1000"
            subtitle="5% increase vs last month"
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <RevenueChart />
                </Grid>
                <Grid item xs={12}>
                  <OrderChart />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <HotOrder />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
