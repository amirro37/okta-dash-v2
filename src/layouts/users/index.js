import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import usersTableData from "layouts/users/data/usersTableData";

function Users() {
  const { columns, rows } = usersTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="info"
              icon="groups"
              title="Active users"
              count="482"
              percentage={{ color: "success", amount: "+6", label: "active in the last day" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="pending_actions"
              title="MFA pending"
              count="38"
              percentage={{ color: "warning", amount: "", label: "need a follow-up" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="success"
              icon="verified_user"
              title="Admins"
              count="26"
              percentage={{ color: "success", amount: "4", label: "delegated admins" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="error"
              icon="highlight_off"
              title="Suspended"
              count="12"
              percentage={{ color: "error", amount: "2", label: "recent lockouts" }}
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
                  py={2.5}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    User hygiene checks
                  </MDTypography>
                </MDBox>
                <MDBox p={3} display="grid" gap={2.5}>
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      Onboarding
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      8 users have not enrolled MFA after 24 hours. Consider nudging them or
                      applying a stricter sign-on policy.
                    </MDTypography>
                  </MDBox>
                  <Divider />
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      Offboarding
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      3 contractor accounts remain enabled past their project end date. Move them to
                      the Deactivated state or revoke app assignments.
                    </MDTypography>
                  </MDBox>
                  <Divider />
                  <MDBox>
                    <MDTypography variant="button" fontWeight="bold">
                      Admin visibility
                    </MDTypography>
                    <MDTypography variant="body2" color="text">
                      Keep admin users inside the &quot;Okta Admins&quot; group with step-up MFA.
                      The dashboard tracks drift so you can reconcile quickly.
                    </MDTypography>
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
                    Users
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2} pb={2}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={{ defaultValue: 5, entries: [5, 10, 15] }}
                    showTotalEntries
                    noEndBorder
                  />
                  <MDBox display="flex" alignItems="center" mt={2} gap={1}>
                    <Icon fontSize="small" color="info">
                      info
                    </Icon>
                    <MDTypography variant="caption" color="text">
                      Sample data only — wire this list up to your preferred user inventory API
                      call.
                    </MDTypography>
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

export default Users;
