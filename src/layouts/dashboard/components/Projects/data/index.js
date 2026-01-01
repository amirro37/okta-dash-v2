/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";

const StatusTag = ({ label, color = "text" }) => (
  <MDTypography variant="caption" color={color} fontWeight="medium" textTransform="capitalize">
    {label}
  </MDTypography>
);

export default function data() {
  return {
    columns: [
      { Header: "name", accessor: "name", width: "35%", align: "left" },
      { Header: "type", accessor: "type", width: "15%", align: "left" },
      { Header: "monthly usage", accessor: "usage", align: "center" },
      { Header: "group rule overlap", accessor: "overlap", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
    ],

    rows: [
      {
        name: (
          <MDTypography variant="button" fontWeight="medium">
            Workday
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            Application
          </MDTypography>
        ),
        usage: (
          <MDTypography variant="button" color="text" fontWeight="medium">
            1,240 sign-ins
          </MDTypography>
        ),
        overlap: <StatusTag label="none" color="success" />,
        status: <StatusTag label="active" color="text" />,
      },
      {
        name: (
          <MDTypography variant="button" fontWeight="medium">
            Sales Operations
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            Group
          </MDTypography>
        ),
        usage: (
          <MDTypography variant="button" color="text" fontWeight="medium">
            980 members
          </MDTypography>
        ),
        overlap: <StatusTag label="overlaps" color="warning" />,
        status: <StatusTag label="active" color="text" />,
      },
      {
        name: (
          <MDTypography variant="button" fontWeight="medium">
            Zoom
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            Application
          </MDTypography>
        ),
        usage: (
          <MDTypography variant="button" color="text" fontWeight="medium">
            870 sign-ins
          </MDTypography>
        ),
        overlap: <StatusTag label="none" color="success" />,
        status: <StatusTag label="active" color="text" />,
      },
      {
        name: (
          <MDTypography variant="button" fontWeight="medium">
            Marketing Owners
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            Group
          </MDTypography>
        ),
        usage: (
          <MDTypography variant="button" color="text" fontWeight="medium">
            230 members
          </MDTypography>
        ),
        overlap: <StatusTag label="review" color="warning" />,
        status: <StatusTag label="active" color="text" />,
      },
      {
        name: (
          <MDTypography variant="button" fontWeight="medium">
            Legacy HR Portal
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            Application
          </MDTypography>
        ),
        usage: (
          <MDTypography variant="button" color="text" fontWeight="medium">
            12 sign-ins
          </MDTypography>
        ),
        overlap: <StatusTag label="none" color="success" />,
        status: <StatusTag label="inactive" color="error" />,
      },
      {
        name: (
          <MDTypography variant="button" fontWeight="medium">
            Contractors Access
          </MDTypography>
        ),
        type: (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            Group
          </MDTypography>
        ),
        usage: (
          <MDTypography variant="button" color="text" fontWeight="medium">
            8 members
          </MDTypography>
        ),
        overlap: <StatusTag label="overlaps" color="warning" />,
        status: <StatusTag label="inactive" color="error" />,
      },
    ],
  };
}
