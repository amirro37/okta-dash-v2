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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Security alerts
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { error } }) => error.main }}>priority_high</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              Critical
            </MDTypography>{" "}
            review required
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="error"
          icon="token"
          title="API tokens for admin services expire within 48 hours"
          dateTime="Rotation needed by 22 DEC"
        />
        <TimelineItem
          color="warning"
          icon="lock_reset"
          title="Unusual spike in password resets from Finance users"
          dateTime="21 DEC 11:00 PM"
        />
        <TimelineItem
          color="info"
          icon="policy"
          title="Mobile app session policy conflicts with org settings"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="primary"
          icon="shield"
          title="New login anomalies flagged across multiple regions"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="dark"
          icon="gpp_bad"
          title="App-level policy overrides detected for Okta Workforce"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
