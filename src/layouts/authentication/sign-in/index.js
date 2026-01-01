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

import { useEffect, useMemo, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

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

// Services
import { initiateGoogleOAuth, initiateSsoEntry } from "services/auth";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const { baseUrl, apiToken, persistCredentials, updateCredentials } = useApi();
  const [identityHint, setIdentityHint] = useState("");
  const [rememberOkta, setRememberOkta] = useState(persistCredentials);
  const [formValues, setFormValues] = useState({
    baseUrl: baseUrl || "",
    apiToken: apiToken || "",
  });
  const [status, setStatus] = useState({
    severity: "info",
    message: "Pick a sign-in path to start a session.",
  });
  const [oktaStatus, setOktaStatus] = useState({
    severity: "info",
    message: "Provide your Okta org URL and an API token.",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const initialHelpText = useMemo(() => {
    const envProvided = baseUrl || apiToken;
    if (!envProvided) return "Provide your Okta org URL and an API token.";
    return "Values prefilled from environment variables can be overridden.";
  }, [apiToken, baseUrl]);

  const handleSetRememberOkta = () => setRememberOkta(!rememberOkta);

  const handleChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  useEffect(() => {
    setOktaStatus((prev) => ({ ...prev, message: initialHelpText }));
  }, [initialHelpText]);

  const handleOktaSubmit = (event) => {
    event.preventDefault();
    updateCredentials({
      baseUrl: formValues.baseUrl,
      apiToken: formValues.apiToken,
      persistCredentials: rememberOkta,
    });
    setOktaStatus({
      severity: "success",
      message:
        "Connection details saved for your session." +
        (rememberOkta ? " We will reuse them on your next visit." : ""),
    });
  };

  const handleGoogleSignIn = async () => {
    setIsProcessing(true);
    setStatus({ severity: "info", message: "Preparing Google OAuth redirect..." });
    try {
      const redirectUrl = await initiateGoogleOAuth({ loginHint: identityHint });
      setStatus({
        severity: "success",
        message: redirectUrl
          ? `Redirecting to Google OAuth at ${redirectUrl}`
          : "Redirecting to Google OAuth.",
      });
    } catch (error) {
      setStatus({
        severity: "error",
        message: error?.message || "Unable to start Google OAuth at this time.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSsoSignIn = async (protocol) => {
    setIsProcessing(true);
    setStatus({
      severity: "info",
      message: `Starting ${protocol.toUpperCase()} flow...`,
    });
    try {
      const redirectUrl = await initiateSsoEntry(protocol, { loginHint: identityHint });
      setStatus({
        severity: "success",
        message: redirectUrl
          ? `Redirecting to ${protocol.toUpperCase()} entry point at ${redirectUrl}`
          : `Started ${protocol.toUpperCase()} flow; follow your identity provider prompts.`,
      });
    } catch (error) {
      setStatus({
        severity: "error",
        message:
          error?.message || `We could not start the ${protocol.toUpperCase()} flow right now.`,
      });
    } finally {
      setIsProcessing(false);
    }
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
                Start with an account, Google OAuth, or your SSO providers and keep your Okta
                connection handy for API-powered widgets.
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <MDBox mb={2}>
              <MDInput
                name="identityHint"
                type="email"
                label="Work email (optional login hint)"
                value={identityHint}
                onChange={({ target }) => setIdentityHint(target.value)}
                fullWidth
                placeholder="your.name@company.com"
                autoComplete="email"
              />
            </MDBox>

            <Grid container spacing={1} mb={2}>
              <Grid item xs={12} md={4}>
                <MDButton
                  component={Link}
                  to="/authentication/sign-up"
                  variant="outlined"
                  color="info"
                  fullWidth
                  startIcon={<Icon>person_add</Icon>}
                >
                  Create account
                </MDButton>
              </Grid>
              <Grid item xs={12} md={4}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  startIcon={<Icon>google</Icon>}
                  onClick={handleGoogleSignIn}
                  disabled={isProcessing}
                >
                  Sign in with Google
                </MDButton>
              </Grid>
              <Grid item xs={12} md={4}>
                <MDButton
                  variant="outlined"
                  color="info"
                  fullWidth
                  startIcon={<Icon>key</Icon>}
                  onClick={() => handleSsoSignIn("oidc")}
                  disabled={isProcessing}
                >
                  Sign in with SSO
                </MDButton>
              </Grid>
            </Grid>

            <Grid container spacing={1} mb={2}>
              <Grid item xs={12} md={6}>
                <MDButton
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  startIcon={<Icon>verified_user</Icon>}
                  onClick={() => handleSsoSignIn("saml")}
                  disabled={isProcessing}
                >
                  Launch SAML entry point
                </MDButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDButton
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  startIcon={<Icon>link</Icon>}
                  onClick={() => handleSsoSignIn("oidc")}
                  disabled={isProcessing}
                >
                  Launch OIDC entry point
                </MDButton>
              </Grid>
            </Grid>

            <MDBox mt={3} mb={1}>
              <Alert severity={status.severity} sx={{ fontSize: "0.9rem" }}>
                {status.message}
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
              <Alert severity={oktaStatus.severity} sx={{ fontSize: "0.9rem" }}>
                {oktaStatus.message}
              </Alert>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
