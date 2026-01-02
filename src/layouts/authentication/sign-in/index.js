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
import { useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Context
import { useAuth } from "context/AuthContext";

// Services
import { initiateGoogleOAuth, initiateSsoEntry } from "services/auth";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
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
  const [status, setStatus] = useState({
    severity: "info",
    message: "Pick a sign-in path to start a session.",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleLoginChange = ({ target }) => {
    setLoginValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleAccountChange = ({ target }) => {
    setAccountValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSsoChange = ({ target }) => {
    setSsoValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const targetRoute =
      location.state?.from && location.state.from !== "/authentication/sign-in"
        ? location.state.from
        : "/dashboard";

    const userEmail =
      loginValues.email || accountValues.email || ssoValues.email || "dashboard-user";

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
    } else if (loginMethod === "microsoft") {
      login(`session-${Date.now()}`, { email: userEmail, method: "microsoft" });
      setStatus("Redirecting to Microsoft sign-in to complete your login.");
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

  const handleSsoSignIn = async (protocol) => {
    setIsProcessing(true);
    const identityHint = ssoValues.email || loginValues.email || accountValues.email;
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
                Start with an account, Google OAuth, or your SSO providers. After signing in,
                configure your Okta connection from Settings to unlock API-powered widgets.
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
                Login
              </MDButton>
              <MDButton
                variant={loginMethod === "google" ? "gradient" : "outlined"}
                color="info"
                type="button"
                onClick={() => setLoginMethod("google")}
                startIcon={<Icon>google</Icon>}
              >
                Sign in with Google
              </MDButton>
              <MDButton
                variant={loginMethod === "microsoft" ? "gradient" : "outlined"}
                color="info"
                type="button"
                onClick={() => setLoginMethod("microsoft")}
                startIcon={<Icon>windows</Icon>}
              >
                Sign in with Microsoft
              </MDButton>
              <MDButton
                variant={loginMethod === "sso" ? "gradient" : "outlined"}
                color="info"
                type="button"
                onClick={() => setLoginMethod("sso")}
                startIcon={<Icon>vpn_key</Icon>}
              >
                SSO login
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
              </MDBox>
            ) : loginMethod === "sso" ? (
              <MDBox my={2}>
                <MDTypography variant="h6" fontWeight="medium" gutterBottom>
                  Use your company SSO
                </MDTypography>
                <MDTypography variant="body2" color="text" mb={2}>
                  Choose your SSO path and confirm your work email to launch the enterprise sign-in
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
                  Continue with company SSO
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
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;