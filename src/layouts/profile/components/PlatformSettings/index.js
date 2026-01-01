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
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const billingContacts = [
  { label: "Primary contact", value: "Jessica Williams (finance@acme.io)" },
  { label: "Backup contact", value: "Arun Patel (ap@acme.io)" },
];

const paymentInstruments = [
  { label: "Default method", value: "Visa •••• 4242 (exp. 08/27)" },
  { label: "Billing address", value: "500 Enterprise Way, Suite 200, Seattle, WA" },
];

const ssoConfigurations = [
  { label: "Preferred IdP", value: "Okta (SAML 2.0)" },
  { label: "Login policy", value: "Enforce SSO for all admins" },
  { label: "MFA", value: "Okta Verify + SMS fallback" },
];

const contractTerms = [
  { label: "Subscription", value: "Enterprise Annual" },
  { label: "Renewal date", value: "December 1, 2025" },
  { label: "Termination notice", value: "60 days" },
];

const profileFields = [
  { label: "Organization", value: "Acme Corp" },
  { label: "Timezone", value: "Pacific Time (PT)" },
  { label: "Data region", value: "US-West" },
];

function renderSection(title, entries) {
  return (
    <MDBox mb={3}>
      <MDTypography
        variant="caption"
        fontWeight="bold"
        color="text"
        textTransform="uppercase"
      >
        {title}
      </MDTypography>
      <MDBox mt={1.5} display="flex" flexDirection="column" gap={1}>
        {entries.map(({ label, value }) => (
          <MDBox key={`${title}-${label}`} display="flex" justifyContent="space-between">
            <MDTypography variant="button" color="text" fontWeight="medium">
              {label}
            </MDTypography>
            <MDTypography variant="button" color="text" textAlign="right">
              {value}
            </MDTypography>
          </MDBox>
        ))}
      </MDBox>
    </MDBox>
  );
}

function PlatformSettings() {
  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          enterprise settings
        </MDTypography>
        <MDTypography variant="button" color="text">
          Key billing, access, and contract details for your organization.
        </MDTypography>
      </MDBox>
      <Divider />
      <MDBox pt={2} pb={2} px={2} lineHeight={1.25}>
        {renderSection("Billing contacts", billingContacts)}
        {renderSection("Payment instruments", paymentInstruments)}
        {renderSection("SSO configuration", ssoConfigurations)}
        {renderSection("Contract terms", contractTerms)}
        {renderSection("Profile fields", profileFields)}
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
