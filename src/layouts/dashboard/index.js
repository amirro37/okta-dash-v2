/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DataTable from "examples/Tables/DataTable";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

// Mocked security stats; replace with real data fetch when backend is available
const useSecurityOverview = () => ({
  mfaEnrollment: {
    value: 86,
    change: "+5%",
    label: "vs. last week",
  },
  activeSessions: {
    value: 1245,
    change: "+12%",
    label: "vs. yesterday",
  },
  passwordResets: {
    value: 42,
    change: "-8%",
    label: "vs. last month",
  },
  expiringTokens: {
    value: 18,
    change: "+3",
    label: "expire in ≤7 days",
  },
});

function Dashboard() {
  const { appLogins } = reportsLineChartData;

  const activeAppCounts = {
    columns: [
      { Header: "app type", accessor: "type", width: "60%", align: "left" },
      { Header: "active", accessor: "active", align: "center" },
    ],
    rows: [
      { type: "SAML", active: "184" },
      { type: "OIDC Web", active: "132" },
      { type: "API Service", active: "96" },
      { type: "SWA", active: "58" },
    ],
  };

  const lastRefreshedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const stats = {
    activeUsers: {
      value: "18,420",
    },
    lockedOutUsers: {
      value: 64,
    },
    suspendedUsers: {
      value: 23,
    },
    deactivatedUsers: {
      value: 312,
    },
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="people"
                title="Active Users"
                count={stats.activeUsers.value}
                percentage={{
                  color: "text",
                  amount: "",
                  label: `Current as of ${lastRefreshedAt}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="lock"
                title="Locked Out"
                count={stats.lockedOutUsers.value}
                percentage={{
                  color: "text",
                  amount: "",
                  label: `Current as of ${lastRefreshedAt}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="pause_circle"
                title="Suspended"
                count={stats.suspendedUsers.value}
                percentage={{
                  color: "text",
                  amount: "",
                  label: `Current as of ${lastRefreshedAt}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="person_off"
                title="Deactivated"
                count={stats.deactivatedUsers.value}
                percentage={{
                  color: "text",
                  amount: "",
                  label: `Current as of ${lastRefreshedAt}`,
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="MFA prompts success"
                  description="Successful MFA challenges by factor"
                  date="updated 5 min ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="App login volume"
                  description="Monthly sign-ins across key apps"
                  date="updated 10 min ago"
                  chart={appLogins}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3} pb={1}>
                    <MDBox>
                      <MDTypography variant="h6" gutterBottom>
                        Active app counts
                      </MDTypography>
                      <MDTypography variant="button" color="text" fontWeight="regular">
                        By integration type
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox px={3} pb={3}>
                    <DataTable
                      table={activeAppCounts}
                      showTotalEntries={false}
                      isSorted={false}
                      entriesPerPage={false}
                      noEndBorder
                    />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
