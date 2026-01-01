/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function data() {
  const Status = ({ label, color }) => (
    <Chip label={label} color={color} size="small" variant="outlined" />
  );

  const Pill = ({ label }) => (
    <MDBox
      component="span"
      px={1.2}
      py={0.4}
      mr={0.5}
      borderRadius="lg"
      bgColor="info"
      color="white"
      fontSize="0.75rem"
      fontWeight="medium"
      display="inline-flex"
      alignItems="center"
    >
      {label}
    </MDBox>
  );

  return {
    columns: [
      { Header: "User", accessor: "user", width: "24%", align: "left" },
      { Header: "Email", accessor: "email", width: "24%", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "MFA", accessor: "mfa", align: "center" },
      { Header: "Last seen", accessor: "lastSeen", align: "center" },
      { Header: "Groups", accessor: "groups", width: "18%", align: "left" },
    ],

    rows: [
      {
        user: (
          <MDTypography variant="button" fontWeight="medium" color="text">
            Alex Martinez
          </MDTypography>
        ),
        email: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            alex.martinez@company.com
          </MDTypography>
        ),
        status: <Status label="Active" color="success" />,
        mfa: <Status label="Enrolled" color="info" />,
        lastSeen: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            3 minutes ago
          </MDTypography>
        ),
        groups: (
          <MDBox>
            <Pill label="Okta Admins" />
            <Pill label="Platform" />
          </MDBox>
        ),
      },
      {
        user: (
          <MDTypography variant="button" fontWeight="medium" color="text">
            Priya Shah
          </MDTypography>
        ),
        email: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            priya.shah@company.com
          </MDTypography>
        ),
        status: <Status label="Active" color="success" />,
        mfa: <Status label="Pending" color="warning" />,
        lastSeen: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            45 minutes ago
          </MDTypography>
        ),
        groups: (
          <MDBox>
            <Pill label="HR" />
            <Pill label="People Systems" />
          </MDBox>
        ),
      },
      {
        user: (
          <MDTypography variant="button" fontWeight="medium" color="text">
            Casey Lee
          </MDTypography>
        ),
        email: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            casey.lee@company.com
          </MDTypography>
        ),
        status: <Status label="Deactivated" color="default" />,
        mfa: <Status label="Revoked" color="error" />,
        lastSeen: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            17 days ago
          </MDTypography>
        ),
        groups: (
          <MDBox>
            <Pill label="Contractors" />
          </MDBox>
        ),
      },
      {
        user: (
          <MDTypography variant="button" fontWeight="medium" color="text">
            Morgan Steele
          </MDTypography>
        ),
        email: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            morgan.steele@company.com
          </MDTypography>
        ),
        status: <Status label="Active" color="success" />,
        mfa: <Status label="Enrolled" color="info" />,
        lastSeen: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Yesterday
          </MDTypography>
        ),
        groups: (
          <MDBox>
            <Pill label="Developers" />
            <Pill label="Feature Flags" />
          </MDBox>
        ),
      },
      {
        user: (
          <MDTypography variant="button" fontWeight="medium" color="text">
            Taylor Young
          </MDTypography>
        ),
        email: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            taylor.young@company.com
          </MDTypography>
        ),
        status: <Status label="Suspended" color="warning" />,
        mfa: <Status label="Pending" color="warning" />,
        lastSeen: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            6 days ago
          </MDTypography>
        ),
        groups: (
          <MDBox>
            <Pill label="Finance" />
            <Pill label="Audit" />
          </MDBox>
        ),
      },
    ],
  };
}
