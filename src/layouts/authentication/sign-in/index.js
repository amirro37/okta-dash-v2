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
import { useLocation, useNavigate } from "react-router-dom";

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
import { useAuth } from "context/AuthContext";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const { baseUrl, apiToken, persistCredentials, updateCredentials } = useApi();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginMethod, setLoginMethod] = useState("local");
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [accountValues, setAccountValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [ssoValues, setSsoValues] = useState({
    domain: "",
    email: "",
  });
  const [ssoMethod, setSsoMethod] = useState("saml");
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

  const handleAccountChange = ({ target }) => {
    setAccountValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSsoChange = ({ target }) => {
    setSsoValues((prev) => ({ ...prev, [target.name]: target.value }));
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
    const targetRoute =
      location.state?.from && location.state.from !== "/authentication/sign-in"
        ? location.state.from
        : "/dashboard";

    const userEmail = loginValues.email || accountValues.email || ssoValues.email || "dashboard-user";

    if (loginMethod === "local") {
      login(`session-${Date.now()}`, { email: userEmail, method: "local" });
      setStatus(
        (loginValues.email
          ? `Signed in as ${loginValues.email} with local credentials.`
          : "Signed in with local credentials.") +
          (rememberMe ? " We'll remember this device." : "")
      );
      navigate(targetRoute, { replace: true });
    } else if (loginMethod === "google") {
      login(`session-${Date.now()}`, { email: userEmail, method: "google" });
      setStatus("Redirecting to Google OAuth to complete your sign-in.");
      navigate(targetRoute, { replace: true });
    } else if (loginMethod === "sso") {
      const methodLabel = ssoMethod === "saml" ? "SAML" : "OIDC";
      login(`session-${Date.now()}`, { email: userEmail, method: methodLabel });
      setStatus(
        `Starting ${methodLabel} SSO for ${
          ssoValues.domain || "your organization"
        }. Check your IdP to continue.`
      );
      navigate(targetRoute, { replace: true });
    } else {
      const passwordConfirmed =
        accountValues.password && accountValues.password === accountValues.confirmPassword;

      if (passwordConfirmed) {
        login(`session-${Date.now()}`, { email: userEmail, method: "create" });
        setStatus(
          `Account created for ${accountValues.email || "new user"}. Check your email to activate.`
        );
        navigate(targetRoute, { replace: true });
      } else {
        setStatus("Password confirmation doesn't match. Please review and try again.");
      }
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
            <MDBox display="flex" justifyContent="center" flexWrap="wrap" gap={1} mb={2}>
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
              <MDButton
                variant={loginMethod === "sso" ? "gradient" : "outlined"}
                color="info"
                type="button"
                onClick={() => setLoginMethod("sso")}
                startIcon={<Icon>vpn_key</Icon>}
              >
                SSO (SAML / OIDC)
              </MDButton>
              <MDButton
                variant={loginMethod === "create" ? "gradient" : "outlined"}
                color="info"
                type="button"
                onClick={() => setLoginMethod("create")}
                startIcon={<Icon>person_add</Icon>}
              >
                Create account
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
            ) : loginMethod === "google" ? (
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
            ) : loginMethod === "sso" ? (
              <MDBox my={2}>
                <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                  Use your company SSO
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  Choose your protocol and confirm your work email to launch the enterprise sign-in
                  journey.
                </MDTypography>
                <Grid container spacing={1} mb={2}>
                  <Grid item xs={12} sm={6}>
                    <MDButton
                      type="button"
                      variant={ssoMethod === "saml" ? "gradient" : "outlined"}
                      color="info"
                      fullWidth
                      onClick={() => setSsoMethod("saml")}
                      startIcon={<Icon>shield</Icon>}
                    >
                      SAML
                    </MDButton>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDButton
                      type="button"
                      variant={ssoMethod === "oidc" ? "gradient" : "outlined"}
                      color="info"
                      fullWidth
                      onClick={() => setSsoMethod("oidc")}
                      startIcon={<Icon>hub</Icon>}
                    >
                      OIDC
                    </MDButton>
                  </Grid>
                </Grid>
                <MDBox mb={2}>
                  <MDInput
                    name="domain"
                    type="text"
                    label="Company domain"
                    value={ssoValues.domain}
                    onChange={handleSsoChange}
                    fullWidth
                    placeholder="company.com"
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    name="email"
                    type="email"
                    label="Work email"
                    value={ssoValues.email}
                    onChange={handleSsoChange}
                    fullWidth
                    placeholder="you@company.com"
                  />
                </MDBox>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  Continue with {ssoMethod === "saml" ? "SAML" : "OIDC"} SSO
                </MDButton>
              </MDBox>
            ) : (
              <MDBox my={2}>
                <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                  Create an admin account
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  Provision credentials for your team and unlock billing, contract review, and SSO
                  setup from day one.
                </MDTypography>
                <MDBox mb={2}>
                  <MDInput
                    name="email"
                    type="email"
                    label="Work email"
                    value={accountValues.email}
                    onChange={handleAccountChange}
                    fullWidth
                    placeholder="owner@company.com"
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    name="password"
                    type="password"
                    label="Password"
                    value={accountValues.password}
                    onChange={handleAccountChange}
                    fullWidth
                    placeholder="Create a secure passphrase"
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    name="confirmPassword"
                    type="password"
                    label="Confirm password"
                    value={accountValues.confirmPassword}
                    onChange={handleAccountChange}
                    fullWidth
                    placeholder="Re-enter password"
                  />
                </MDBox>
                <MDButton type="submit" variant="gradient" color="info" fullWidth>
                  Create account
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
