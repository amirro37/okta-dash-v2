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

import { useMemo, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Context
import { useApi } from "context/ApiContext";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const { baseUrl, apiToken, persistCredentials, updateCredentials } = useApi();
  const [rememberMe, setRememberMe] = useState(persistCredentials);
  const [formValues, setFormValues] = useState({
    baseUrl: baseUrl || "",
    apiToken: apiToken || "",
  });
  const [status, setStatus] = useState("");

  const initialHelpText = useMemo(() => {
    const envProvided = baseUrl || apiToken;
    if (!envProvided) return "Provide your Okta org URL and an API token.";
    return "Values prefilled from environment variables can be overridden.";
  }, [apiToken, baseUrl]);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCredentials({
      baseUrl: formValues.baseUrl,
      apiToken: formValues.apiToken,
      persistCredentials: rememberMe,
    });
    setStatus(
      "Connection details saved for your session." +
        (rememberMe ? " We will reuse them on your next visit." : "")
    );
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Connect your Okta tenant
          </MDTypography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12}>
              <MDTypography variant="button" color="white">
                Store your Okta base URL and API token (SSWS) to use across dashboard calls.
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                name="baseUrl"
                type="url"
                label="Okta Base URL"
                value={formValues.baseUrl}
                onChange={handleChange}
                fullWidth
                placeholder="https://your-domain.okta.com"
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                name="apiToken"
                type="password"
                label="API Token (SSWS)"
                value={formValues.apiToken}
                onChange={handleChange}
                fullWidth
                placeholder="ssws token"
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember on this device
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Save connection settings
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1}>
              <Alert severity="info" sx={{ fontSize: "0.9rem" }}>
                {status || initialHelpText}
              </Alert>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
