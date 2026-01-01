import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function Apps() {
  const apps = [
    {
      name: "Okta Admin Console",
      access: "Okta Admins",
      provisioning: "Manual",
      health: "Operational",
      lastSync: "n/a",
    },
    {
      name: "Google Workspace",
      access: "Everyone",
      provisioning: "SCIM",
      health: "Degraded - sync lag",
      lastSync: "12 minutes ago",
    },
    {
      name: "Salesforce",
      access: "Sales + Support",
      provisioning: "JIT + SCIM",
      health: "Operational",
      lastSync: "4 minutes ago",
    },
    {
      name: "Slack",
      access: "Everyone",
      provisioning: "SCIM",
      health: "Operational",
      lastSync: "9 minutes ago",
    },
    {
      name: "Snowflake",
      access: "Data Platform",
      provisioning: "JIT",
      health: "Review MFA",
      lastSync: "18 minutes ago",
    },
  ];

  const appColumns = [
    { Header: "Application", accessor: "name", width: "28%" },
    { Header: "Access", accessor: "access", align: "center" },
    { Header: "Provisioning", accessor: "provisioning", align: "center" },
    { Header: "Health", accessor: "health", align: "center" },
    { Header: "Last sync", accessor: "lastSync", align: "center" },
  ];

  const appRows = apps.map((app) => ({
    name: (
      <MDTypography variant="button" fontWeight="medium" color="text">
        {app.name}
      </MDTypography>
    ),
    access: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {app.access}
      </MDTypography>
    ),
    provisioning: (
      <Chip
        label={app.provisioning}
        color={app.provisioning.includes("SCIM") ? "success" : "info"}
        size="small"
        variant="outlined"
      />
    ),
    health: (
      <Chip
        label={app.health}
        color={
          app.health.includes("Degraded") || app.health.includes("Review") ? "warning" : "success"
        }
        size="small"
      />
    ),
    lastSync: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {app.lastSync}
      </MDTypography>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="info"
              icon="apps"
              title="Applications"
              count={apps.length}
              percentage={{ color: "success", amount: "", label: "tracked in this dashboard" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="success"
              icon="sync"
              title="Healthy syncs"
              count="4"
              percentage={{ color: "success", amount: "", label: "latest updates flowing" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="av_timer"
              title="Watchlist"
              count="1"
              percentage={{ color: "warning", amount: "", label: "apps with lag" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="secondary"
              icon="security"
              title="MFA enforced"
              count="87%"
              percentage={{ color: "secondary", amount: "", label: "coverage across apps" }}
            />
          </Grid>
        </Grid>

        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Applications
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2} pb={2}>
                  <DataTable
                    table={{ columns: appColumns, rows: appRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Provisioning checks
                  </MDTypography>
                </MDBox>
                <MDBox p={3} display="grid" gap={2.5}>
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      Google Workspace
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      Sync delay noted. Last sync 12 minutes ago; ensure the SCIM connector is still
                      enabled and rate limits are healthy.
                    </MDTypography>
                    <LinearProgress
                      variant="determinate"
                      color="warning"
                      value={55}
                      sx={{ mt: 1 }}
                    />
                  </MDBox>
                  <Divider />
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      Snowflake
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      MFA policy change pending. Confirm step-up requirements for admins and service
                      accounts.
                    </MDTypography>
                    <LinearProgress variant="determinate" color="info" value={70} sx={{ mt: 1 }} />
                  </MDBox>
                  <Divider />
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      Service accounts
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      Track non-human accounts and align them to least privilege groups before
                      enabling auto-provisioning.
                    </MDTypography>
                    <MDButton variant="outlined" color="info" size="small" sx={{ mt: 1 }}>
                      View checklist
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Apps;
