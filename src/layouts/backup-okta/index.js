import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function BackupOkta() {
  const snapshots = [
    { label: "Nightly snapshot", time: "Today 02:00 UTC", status: "Success", size: "142 MB" },
    { label: "On-demand export", time: "Yesterday 18:45 UTC", status: "Success", size: "138 MB" },
    { label: "Drift capture", time: "2 days ago", status: "Warnings", size: "141 MB" },
    { label: "Weekly archive", time: "6 days ago", status: "Success", size: "139 MB" },
  ];

  const snapshotColumns = [
    { Header: "Name", accessor: "label", width: "30%" },
    { Header: "Timestamp", accessor: "time", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Size", accessor: "size", align: "center" },
  ];

  const snapshotRows = snapshots.map((snapshot) => ({
    label: (
      <MDTypography variant="button" fontWeight="medium" color="text">
        {snapshot.label}
      </MDTypography>
    ),
    time: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {snapshot.time}
      </MDTypography>
    ),
    status: (
      <Chip
        label={snapshot.status}
        color={snapshot.status === "Success" ? "success" : "warning"}
        size="small"
        variant="outlined"
      />
    ),
    size: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {snapshot.size}
      </MDTypography>
    ),
  }));

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <ComplexStatisticsCard
              color="info"
              icon="cloud_upload"
              title="Last backup"
              count="02:00 UTC"
              percentage={{ color: "success", amount: "", label: "completed successfully" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ComplexStatisticsCard
              color="success"
              icon="inventory"
              title="Snapshots stored"
              count={snapshots.length}
              percentage={{ color: "success", amount: "", label: "rolling 7 days" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ComplexStatisticsCard
              color="secondary"
              icon="play_circle"
              title="Recovery drills"
              count="Quarterly"
              percentage={{ color: "secondary", amount: "", label: "next run Friday" }}
            />
          </Grid>
        </Grid>

        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
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
                    Backup plan
                  </MDTypography>
                </MDBox>
                <MDBox p={3} display="grid" gap={2}>
                  <MDTypography variant="body2" color="text">
                    Schedule: nightly at 02:00 UTC with retention for 7 daily snapshots and 4 weekly
                    archives. Include users, groups, rules, policies, and app assignments.
                  </MDTypography>
                  <Divider />
                  <MDTypography variant="body2" color="text">
                    Storage: encrypted object storage in your tenant-owned bucket. Checksums are
                    validated after each transfer.
                  </MDTypography>
                  <Divider />
                  <MDBox display="flex" gap={1} flexWrap="wrap">
                    <MDButton variant="gradient" color="info">
                      Run backup now
                    </MDButton>
                    <MDButton variant="outlined" color="info">
                      Download latest snapshot
                    </MDButton>
                    <MDButton variant="text" color="info">
                      View retention policy
                    </MDButton>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
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
                    Snapshot history
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2} pb={2}>
                  <DataTable
                    table={{ columns: snapshotColumns, rows: snapshotRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                  <MDTypography variant="caption" color="text" display="block" mt={2}>
                    Track changes between snapshots to confirm group, app, and policy posture before
                    restoring.
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default BackupOkta;
