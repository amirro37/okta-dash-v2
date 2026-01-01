import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function Usage() {
  const events = [
    {
      actor: "alex.martinez",
      action: "Signed in",
      result: "Success",
      context: "Dashboard",
      time: "2 mins ago",
    },
    {
      actor: "taylor.young",
      action: "MFA challenge",
      result: "Step-up applied",
      context: "Salesforce",
      time: "14 mins ago",
    },
    {
      actor: "service.okta-agent",
      action: "Provisioned user",
      result: "Success",
      context: "Slack",
      time: "33 mins ago",
    },
    {
      actor: "casey.lee",
      action: "Suspended session",
      result: "Policy block",
      context: "Okta Admin Console",
      time: "48 mins ago",
    },
  ];

  const eventColumns = [
    { Header: "Actor", accessor: "actor" },
    { Header: "Action", accessor: "action" },
    { Header: "Result", accessor: "result", align: "center" },
    { Header: "Context", accessor: "context", align: "center" },
    { Header: "Time", accessor: "time", align: "center" },
  ];

  const eventRows = events.map((event) => ({
    actor: (
      <MDTypography variant="button" fontWeight="medium" color="text">
        {event.actor}
      </MDTypography>
    ),
    action: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {event.action}
      </MDTypography>
    ),
    result: (
      <MDTypography
        variant="caption"
        color={event.result.includes("Success") ? "success" : "warning"}
        fontWeight="medium"
      >
        {event.result}
      </MDTypography>
    ),
    context: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {event.context}
      </MDTypography>
    ),
    time: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {event.time}
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
              icon="bar_chart"
              title="Sign-ins today"
              count="3,482"
              percentage={{ color: "success", amount: "+4%", label: "vs. yesterday" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="success"
              icon="verified"
              title="MFA success"
              count="97%"
              percentage={{ color: "success", amount: "", label: "of challenges" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="error_outline"
              title="Policy blocks"
              count="14"
              percentage={{ color: "warning", amount: "+3", label: "past hour" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="secondary"
              icon="schedule"
              title="Avg. session"
              count="42m"
              percentage={{ color: "secondary", amount: "", label: "median duration" }}
            />
          </Grid>
        </Grid>

        <MDBox mt={4}>
          <Grid container spacing={3}>
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
                    Sign-in funnel
                  </MDTypography>
                </MDBox>
                <MDBox p={3} display="grid" gap={2.5}>
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      Total attempts
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      5,120 attempts in the last 24 hours.
                    </MDTypography>
                    <LinearProgress variant="determinate" value={100} color="info" sx={{ mt: 1 }} />
                  </MDBox>
                  <Divider />
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      MFA challenges
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      1,940 step-up prompts with 97% success.
                    </MDTypography>
                    <LinearProgress
                      variant="determinate"
                      value={97}
                      color="success"
                      sx={{ mt: 1 }}
                    />
                  </MDBox>
                  <Divider />
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      Blocks
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      14 blocks from velocity rules and device posture checks.
                    </MDTypography>
                    <LinearProgress
                      variant="determinate"
                      value={12}
                      color="warning"
                      sx={{ mt: 1 }}
                    />
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>

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
                    Latest activity
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2} pb={2}>
                  <DataTable
                    table={{ columns: eventColumns, rows: eventRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Usage;
