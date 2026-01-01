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
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

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
  const [loginMethod, setLoginMethod] = useState("local");
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [rememberOkta, setRememberOkta] = useState(persistCredentials);
  const [formValues, setFormValues] = useState({
    baseUrl: baseUrl || "",
    apiToken: apiToken || "",
  });
  const [status, setStatus] = useState("");
  const [oktaStatus, setOktaStatus] = useState("");

  const initialHelpText = useMemo(() => {
    const envProvided = baseUrl || apiToken;
    if (!envProvided) return "Provide your Okta org URL and an API token.";
    return "Values prefilled from environment variables can be overridden.";
  }, [apiToken, baseUrl]);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleSetRememberOkta = () => setRememberOkta(!rememberOkta);

  const handleChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleOktaSubmit = (event) => {
    event.preventDefault();
    updateCredentials({
      baseUrl: formValues.baseUrl,
      apiToken: formValues.apiToken,
      persistCredentials: rememberOkta,
    });
    setOktaStatus(
      "Connection details saved for your session." +
        (rememberOkta ? " We will reuse them on your next visit." : "")
    );
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (loginMethod === "local") {
      setStatus(
        (loginValues.email
          ? `Signed in as ${loginValues.email} with local credentials.`
          : "Signed in with local credentials.") +
          (rememberMe ? " We'll remember this device." : "")
      );
    } else {
      setStatus("Signed in with Google (mocked OAuth flow for this dashboard).");
    }
  };

  const handleLoginChange = ({ target }) => {
    setLoginValues((prev) => ({ ...prev, [target.name]: target.value }));
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
            Welcome back
          </MDTypography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12}>
              <MDTypography variant="button" color="white">
                Sign in with a local account or Google and keep your Okta connection handy for
                API-powered widgets.
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleLoginSubmit}>
            <MDBox display="flex" justifyContent="center" gap={1} mb={2}>
              <MDButton
                variant={loginMethod === "local" ? "gradient" : "outlined"}
                color="info"
                type="button"
                onClick={() => setLoginMethod("local")}
                startIcon={<Icon>person</Icon>}
              >
                Local account
              </MDButton>
              <MDButton
                variant={loginMethod === "google" ? "gradient" : "outlined"}
                color="info"
                type="button"
                onClick={() => setLoginMethod("google")}
                startIcon={<Icon>google</Icon>}
              >
                Google
              </MDButton>
            </MDBox>

            {loginMethod === "local" ? (
              <>
                <MDBox mb={2}>
                  <MDInput
                    name="email"
                    type="email"
                    label="Work email"
                    value={loginValues.email}
                    onChange={handleLoginChange}
                    fullWidth
                    placeholder="your.name@company.com"
                    autoComplete="username"
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    name="password"
                    type="password"
                    label="Password"
                    value={loginValues.password}
                    onChange={handleLoginChange}
                    fullWidth
                    placeholder="••••••••"
                    autoComplete="current-password"
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
                    &nbsp;&nbsp;Keep me signed in on this device
                  </MDTypography>
                </MDBox>
              </>
            ) : (
              <MDBox textAlign="center" my={2}>
                <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                  Sign in with Google
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  We will route you through Google OAuth and return you to the dashboard once
                  authenticated.
                </MDTypography>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  Continue with Google
                </MDButton>
              </MDBox>
            )}

            {loginMethod === "local" && (
              <MDBox mt={4} mb={1}>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  Sign in
                </MDButton>
              </MDBox>
            )}
            <MDBox mt={3} mb={1}>
              <Alert severity="info" sx={{ fontSize: "0.9rem" }}>
                {status || "Choose a method and sign in to continue."}
              </Alert>
            </MDBox>
          </MDBox>

          <Divider sx={{ my: 3 }}>Okta connection</Divider>

          <MDBox component="form" role="form" onSubmit={handleOktaSubmit}>
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
              <Switch checked={rememberOkta} onChange={handleSetRememberOkta} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberOkta}
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
                {oktaStatus || initialHelpText}
              </Alert>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
