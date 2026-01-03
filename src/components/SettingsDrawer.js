import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

// @mui components
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";

// Material Dashboard components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Context
import { useApi } from "context/ApiContext";

function SettingsDrawer({ open, onClose }) {
  const { baseUrl, apiToken, persistCredentials, updateCredentials } = useApi();
  const [formValues, setFormValues] = useState({
    baseUrl: baseUrl || "",
    apiToken: apiToken || "",
  });
  const [rememberCredentials, setRememberCredentials] = useState(persistCredentials);
  const [status, setStatus] = useState({ severity: "info", message: "" });

  const initialHelpText = useMemo(() => {
    const envProvided = baseUrl || apiToken;
    if (!envProvided) return "Provide your Okta org URL and an API token.";
    return "Values prefilled from environment variables can be overridden.";
  }, [apiToken, baseUrl]);

  useEffect(() => {
    if (open) {
      setFormValues({ baseUrl: baseUrl || "", apiToken: apiToken || "" });
      setRememberCredentials(persistCredentials);
      setStatus({ severity: "info", message: initialHelpText });
    }
  }, [open, baseUrl, apiToken, persistCredentials, initialHelpText]);

  const handleChange = ({ target }) => {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCredentials({
      baseUrl: formValues.baseUrl,
      apiToken: formValues.apiToken,
      persistCredentials: rememberCredentials,
    });
    setStatus({
      severity: "success",
      message:
        "Connection details saved for your session." +
        (rememberCredentials ? " We will reuse them on your next visit." : ""),
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 420, maxWidth: "100%" } }}
    >
      <MDBox display="flex" alignItems="center" justifyContent="space-between" p={3} pb={1.5}>
        <MDBox>
          <MDTypography variant="h5">Connection settings</MDTypography>
          <MDTypography variant="button" color="text" fontWeight="regular">
            Manage your Okta base URL and API token
          </MDTypography>
        </MDBox>
        <IconButton onClick={onClose} size="small">
          <Icon>close</Icon>
        </IconButton>
      </MDBox>
      <Divider />
      <MDBox component="form" role="form" p={3} onSubmit={handleSubmit}>
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
        <MDBox mb={1}>
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
        <MDTypography variant="caption" color="text" display="block" mb={2}>
          {initialHelpText}
        </MDTypography>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch
            checked={rememberCredentials}
            onChange={() => setRememberCredentials((prev) => !prev)}
          />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={() => setRememberCredentials((prev) => !prev)}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Remember on this device
          </MDTypography>
        </MDBox>
        <MDBox mt={3} mb={2}>
          <MDButton type="submit" variant="gradient" color="info" fullWidth>
            Save connection settings
          </MDButton>
        </MDBox>
        {status.message ? (
          <Alert severity={status.severity} sx={{ fontSize: "0.9rem" }}>
            {status.message}
          </Alert>
        ) : null}
      </MDBox>
    </Drawer>
  );
}

SettingsDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SettingsDrawer;
