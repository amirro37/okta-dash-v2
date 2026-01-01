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

function Groups() {
  const groups = [
    { name: "Okta Admins", status: "Active", members: 26, type: "Admin", reviewed: "1 day ago" },
    {
      name: "Support Admins",
      status: "Active",
      members: 14,
      type: "Admin",
      reviewed: "2 days ago",
    },
    {
      name: "HR - All Employees",
      status: "Active",
      members: 2204,
      type: "Business",
      reviewed: "Today",
    },
    {
      name: "Contractors",
      status: "Deactivated",
      members: 0,
      type: "Contractor",
      reviewed: "5 days ago",
    },
    {
      name: "Marketing Sandbox",
      status: "Deactivated",
      members: 8,
      type: "Sandbox",
      reviewed: "2 weeks ago",
    },
  ];

  const groupRules = [
    {
      name: "Okta admin baseline",
      status: "Active",
      assigns: ["Okta Admins"],
      overlapWith: ["Legacy admin uplift"],
      lastRun: "10 minutes ago",
    },
    {
      name: "Legacy admin uplift",
      status: "Paused",
      assigns: ["Okta Admins"],
      overlapWith: ["Okta admin baseline"],
      lastRun: "2 hours ago",
    },
    {
      name: "HR onboarding",
      status: "Active",
      assigns: ["HR - All Employees"],
      overlapWith: [],
      lastRun: "5 minutes ago",
    },
    {
      name: "Contractor sunset",
      status: "Active",
      assigns: ["Contractors"],
      overlapWith: [],
      lastRun: "54 minutes ago",
    },
  ];

  const activeGroups = groups.filter((group) => group.status === "Active").length;
  const inactiveGroups = groups.filter((group) => group.status !== "Active").length;
  const activeRules = groupRules.filter((rule) => rule.status === "Active").length;
  const overlappingRules = groupRules.filter((rule) => rule.overlapWith.length > 0).length;

  const adminGroups = groups.filter((group) => group.type === "Admin");

  const groupColumns = [
    { Header: "Group", accessor: "name", width: "30%" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Members", accessor: "members", align: "center" },
    { Header: "Type", accessor: "type", align: "center" },
    { Header: "Reviewed", accessor: "reviewed", align: "center" },
  ];

  const groupRows = groups.map((group) => ({
    name: (
      <MDTypography variant="button" fontWeight="medium" color="text">
        {group.name}
      </MDTypography>
    ),
    status: (
      <Chip
        label={group.status}
        color={group.status === "Active" ? "success" : "default"}
        size="small"
        variant="outlined"
      />
    ),
    members: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {group.members.toLocaleString()}
      </MDTypography>
    ),
    type: (
      <Chip label={group.type} color={group.type === "Admin" ? "info" : "secondary"} size="small" />
    ),
    reviewed: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {group.reviewed}
      </MDTypography>
    ),
  }));

  const ruleColumns = [
    { Header: "Rule", accessor: "name", width: "26%" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Targets", accessor: "targets", align: "left" },
    { Header: "Overlap", accessor: "overlap", align: "left" },
    { Header: "Last evaluated", accessor: "lastRun", align: "center" },
  ];

  const ruleRows = groupRules.map((rule) => ({
    name: (
      <MDTypography variant="button" fontWeight="medium" color="text">
        {rule.name}
      </MDTypography>
    ),
    status: (
      <Chip
        label={rule.status}
        color={rule.status === "Active" ? "success" : "warning"}
        size="small"
        variant="outlined"
      />
    ),
    targets: (
      <MDBox display="flex" flexWrap="wrap" gap={1}>
        {rule.assigns.map((target) => (
          <MDBox
            key={target}
            component="span"
            px={1}
            py={0.5}
            borderRadius="lg"
            bgColor="info"
            color="white"
            fontSize="0.75rem"
            fontWeight="medium"
          >
            {target}
          </MDBox>
        ))}
      </MDBox>
    ),
    overlap: rule.overlapWith.length ? (
      <MDTypography variant="caption" color="error" fontWeight="medium">
        Overlaps with {rule.overlapWith.join(", ")}
      </MDTypography>
    ) : (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        No overlaps detected
      </MDTypography>
    ),
    lastRun: (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {rule.lastRun}
      </MDTypography>
    ),
  }));

  const aiSummary = `AI summary: ${activeGroups} active groups, ${inactiveGroups} deactivated, ${activeRules} active rules. ${overlappingRules} rule(s) overlap on the same targets, mostly around Okta Admins. Prioritize keeping admin groups tightly scoped and monitor paused rules that still share targets.`;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="info"
              icon="group"
              title="Active groups"
              count={activeGroups}
              percentage={{ color: "success", amount: "+2", label: "added this week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="secondary"
              icon="block"
              title="Deactivated groups"
              count={inactiveGroups}
              percentage={{ color: "secondary", amount: "", label: "ready for cleanup" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="success"
              icon="rule"
              title="Active group rules"
              count={activeRules}
              percentage={{ color: "success", amount: "", label: "running as expected" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="report"
              title="Overlap detected"
              count={overlappingRules}
              percentage={{ color: "warning", amount: "", label: "check shared targets" }}
            />
          </Grid>
        </Grid>

        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
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
                    Groups
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2} pb={2}>
                  <DataTable
                    table={{ columns: groupColumns, rows: groupRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12} lg={5}>
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
                    Admin groups focus
                  </MDTypography>
                </MDBox>
                <MDBox p={3} display="grid" gap={2.5}>
                  {adminGroups.map((group) => (
                    <MDBox
                      key={group.name}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <MDBox>
                        <MDTypography variant="button" fontWeight="bold">
                          {group.name}
                        </MDTypography>
                        <MDTypography variant="caption" color="text" display="block">
                          {group.members} members • reviewed {group.reviewed}
                        </MDTypography>
                      </MDBox>
                      <MDButton variant="outlined" color="info" size="small">
                        View members
                      </MDButton>
                    </MDBox>
                  ))}
                  <Divider />
                  <MDTypography variant="body2" color="text">
                    Keep admin membership consistent across rules. Overlapping assignments to{" "}
                    <MDTypography component="span" variant="body2" fontWeight="bold">
                      Okta Admins
                    </MDTypography>{" "}
                    are highlighted so you can reconcile which rule should own it.
                  </MDTypography>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
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
                    Group rules
                  </MDTypography>
                </MDBox>
                <MDBox pt={3} px={2} pb={2}>
                  <DataTable
                    table={{ columns: ruleColumns, rows: ruleRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>

            <Grid item xs={12} lg={5}>
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
                    AI summary
                  </MDTypography>
                </MDBox>
                <MDBox p={3} display="grid" gap={2}>
                  <MDTypography variant="body2" color="text">
                    {aiSummary}
                  </MDTypography>
                  <Divider />
                  <MDTypography variant="body2" color="text">
                    Recommendations: keep a single source of truth for each target group, archive
                    overlapping rules once successors are verified, and review paused rules before
                    reactivating to avoid unexpected assignments.
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

export default Groups;
