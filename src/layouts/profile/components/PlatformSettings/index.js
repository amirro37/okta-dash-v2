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

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function PlatformSettings() {
  const [samlEnforced, setSamlEnforced] = useState(true);
  const [oidcEnabled, setOidcEnabled] = useState(true);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [autoPay, setAutoPay] = useState(false);
  const [contractReviews, setContractReviews] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);
  const [accentColor, setAccentColor] = useState("indigo");
  const [highContrast, setHighContrast] = useState(false);

  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          platform settings
        </MDTypography>
        <MDTypography variant="button" color="text" display="block">
          Enterprise configuration is grouped by identity, billing, contracts, and visual
          preferences.
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
          identity & access
        </MDTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={samlEnforced} onChange={() => setSamlEnforced(!samlEnforced)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Require SAML for workforce users
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={oidcEnabled} onChange={() => setOidcEnabled(!oidcEnabled)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Enable OIDC client logins for apps
            </MDTypography>
          </MDBox>
        </MDBox>

        <MDBox mt={3}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            billing & contracts
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={billingAlerts} onChange={() => setBillingAlerts(!billingAlerts)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Billing alerts to finance contacts
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={autoPay} onChange={() => setAutoPay(!autoPay)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Enable autopay for invoices
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch
              checked={contractReviews}
              onChange={() => setContractReviews(!contractReviews)}
            />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              AI contract review reminders
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" gap={1} ml={-1.5} mt={1}>
          <MDButton
            variant="gradient"
            color="info"
            size="small"
            startIcon={<Icon>description</Icon>}
          >
            Review contract for savings
          </MDButton>
          <MDButton variant="outlined" color="info" size="small" startIcon={<Icon>payments</Icon>}>
            Update payment method
          </MDButton>
        </MDBox>

        <MDBox mt={3}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            visual preferences
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={darkTheme} onChange={() => setDarkTheme(!darkTheme)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Dark theme
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              High-contrast mode
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDTypography variant="caption" color="text">
          Accent color: {accentColor}
        </MDTypography>
        <MDBox display="flex" gap={1} mt={1}>
          {[
            "indigo",
            "teal",
            "orange",
            "purple",
            "pink",
            "blue",
          ].map((color) => (
            <MDButton
              key={color}
              size="small"
              variant={accentColor === color ? "gradient" : "outlined"}
              color="info"
              onClick={() => setAccentColor(color)}
            >
              {color}
            </MDButton>
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
