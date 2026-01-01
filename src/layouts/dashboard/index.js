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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

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
  const { appLogins, policyEvaluations } = reportsLineChartData;

  const stats = {
    mfaEnrollment: {
      value: 92,
      change: "+3%",
      label: "enrolled this month",
    },
    activeSessions: {
      value: "1,284",
      change: "+5%",
      label: "active session tokens",
    },
    passwordResets: {
      value: 76,
      change: "+12%",
      label: "past 24 hours",
    },
    expiringTokens: {
      value: 12,
      change: "-4",
      label: "tokens expiring this week",
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
                icon="security"
                title="MFA Enrollment"
                count={`${stats.mfaEnrollment.value}%`}
                percentage={{
                  color: "success",
                  amount: stats.mfaEnrollment.change,
                  label: stats.mfaEnrollment.label,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="info"
                icon="devices"
                title="Active Sessions"
                count={stats.activeSessions.value}
                percentage={{
                  color: "info",
                  amount: stats.activeSessions.change,
                  label: stats.activeSessions.label,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="refresh"
                title="Password Resets"
                count={stats.passwordResets.value}
                percentage={{
                  color: "warning",
                  amount: stats.passwordResets.change,
                  label: stats.passwordResets.label,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="vpn_key"
                title="API Tokens Expiring"
                count={stats.expiringTokens.value}
                percentage={{
                  color: "error",
                  amount: stats.expiringTokens.change,
                  label: stats.expiringTokens.label,
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
                <ReportsLineChart
                  color="dark"
                  title="Policy evaluation outcomes"
                  description="Allow decisions from sign-on and MFA policies"
                  date="updated 10 min ago"
                  chart={policyEvaluations}
                />
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
