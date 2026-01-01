import { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import { useApi } from "context/ApiContext";

function Settings() {
  const {
    baseUrl,
    apiToken,
    persistCredentials,
    identitySettings,
    billingDetails,
    customerProfile,
    contractInsights,
    updateCredentials,
    updateIdentitySettings,
    updateBillingDetails,
    updateCustomerProfile,
    updateContractInsights,
  } = useApi();

  const [aiStatus, setAiStatus] = useState("");

  const connectionStatus = useMemo(
    () => (baseUrl && apiToken ? "Ready" : "Action required"),
    [apiToken, baseUrl]
  );

  const identityStatus = useMemo(() => {
    if (identitySettings.metadataUrl || identitySettings.oidcIssuer) {
      return "Configured";
    }

    return "Pending";
  }, [identitySettings.metadataUrl, identitySettings.oidcIssuer]);

  const billingStatus = useMemo(() => {
    if (billingDetails.billingContact && billingDetails.paymentMethod) {
      return "Complete";
    }

    return "Draft";
  }, [billingDetails.billingContact, billingDetails.paymentMethod]);

  const handleAiReview = () => {
    const reviewTimestamp = new Date().toLocaleString();
    const defaultNotes = contractInsights.aiReviewNotes || "AI review queued for Okta agreement.";

    updateContractInsights({
      aiReviewNotes: defaultNotes,
      lastReviewed: reviewTimestamp,
    });
    setAiStatus(`AI contract review requested (${reviewTimestamp})`);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <DefaultInfoCard
              icon="shield"
              title="Okta connection"
              description="Provide org URL and API token to unlock automation."
              value={connectionStatus}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultInfoCard
              icon="fingerprint"
              title="Identity protocols"
              description="SAML/OIDC endpoints feed into governance playbooks."
              value={identityStatus}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultInfoCard
              icon="credit_card"
              title="Billing readiness"
              description="Keep payment data current before renewals."
              value={billingStatus}
            />
          </Grid>
        </Grid>
      </MDBox>

      <MDBox mb={3}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" gutterBottom>
              Okta connection
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              Required for API calls, lifecycle automation, and audit exports.
            </MDTypography>
            <MDBox mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="Okta base URL"
                    value={baseUrl}
                    onChange={(event) => updateCredentials({ baseUrl: event.target.value })}
                    fullWidth
                    placeholder="https://your-domain.okta.com"
                    helperText="Use the full tenant URL. Include https:// and avoid trailing slashes."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="API token"
                    value={apiToken}
                    onChange={(event) => updateCredentials({ apiToken: event.target.value })}
                    fullWidth
                    type="password"
                    placeholder="SSWS..."
                    helperText="Token must have permissions for users, groups, apps, and logs."
                  />
                </Grid>
              </Grid>
              <MDBox mt={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={persistCredentials}
                      onChange={(event) =>
                        updateCredentials({
                          persistCredentials: event.target.checked,
                        })
                      }
                    />
                  }
                  label="Persist credentials locally for reuse"
                />
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>

      <MDBox mb={3}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" gutterBottom>
              Identity settings
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              Capture SAML/OIDC details to align integrations and metadata monitoring.
            </MDTypography>
            <MDBox mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="SAML ACS URL"
                    value={identitySettings.samlAcsUrl}
                    onChange={(event) => updateIdentitySettings({ samlAcsUrl: event.target.value })}
                    fullWidth
                    helperText="Typically the Okta redirect URL provided by downstream apps."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="SAML entity ID"
                    value={identitySettings.samlEntityId}
                    onChange={(event) =>
                      updateIdentitySettings({
                        samlEntityId: event.target.value,
                      })
                    }
                    fullWidth
                    helperText="Match the issuer expected by your service provider metadata."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="OIDC issuer URL"
                    value={identitySettings.oidcIssuer}
                    onChange={(event) => updateIdentitySettings({ oidcIssuer: event.target.value })}
                    fullWidth
                    placeholder="https://your-domain.okta.com/oauth2/default"
                    helperText="Needed for JWKS validation and token audience checks."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="Metadata URL"
                    value={identitySettings.metadataUrl}
                    onChange={(event) =>
                      updateIdentitySettings({ metadataUrl: event.target.value })
                    }
                    fullWidth
                    helperText="Paste the federation metadata or OpenID configuration endpoint."
                  />
                </Grid>
              </Grid>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" gutterBottom>
                Billing & payment details
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Keep finance contacts current to avoid provisioning pauses.
              </MDTypography>
              <MDBox mt={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDInput
                      label="Billing contact"
                      value={billingDetails.billingContact}
                      onChange={(event) =>
                        updateBillingDetails({
                          billingContact: event.target.value,
                        })
                      }
                      fullWidth
                      helperText="Primary owner for invoices and renewal notices."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Billing email"
                      value={billingDetails.billingEmail}
                      onChange={(event) =>
                        updateBillingDetails({ billingEmail: event.target.value })
                      }
                      fullWidth
                      type="email"
                      helperText="Use a shared alias monitored by finance (e.g., billing@company.com)."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Payment method"
                      value={billingDetails.paymentMethod}
                      onChange={(event) =>
                        updateBillingDetails({ paymentMethod: event.target.value })
                      }
                      fullWidth
                      placeholder="Credit card, ACH, invoice"
                      helperText="Document what procurement approved for this tenant."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Purchase order / contract number"
                      value={billingDetails.purchaseOrder}
                      onChange={(event) =>
                        updateBillingDetails({ purchaseOrder: event.target.value })
                      }
                      fullWidth
                      helperText="Tie usage to PO lines for smoother audits."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Tax ID"
                      value={billingDetails.taxId}
                      onChange={(event) => updateBillingDetails({ taxId: event.target.value })}
                      fullWidth
                      helperText="Optional but helpful for invoicing validation."
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <MDBox p={3}>
              <MDTypography variant="h6" gutterBottom>
                Customer profile
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Helps support engineers validate changes and communicate updates.
              </MDTypography>
              <MDBox mt={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <MDInput
                      label="Company name"
                      value={customerProfile.companyName}
                      onChange={(event) =>
                        updateCustomerProfile({
                          companyName: event.target.value,
                        })
                      }
                      fullWidth
                      helperText="Appears on executive summaries and incident runbooks."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Primary admin"
                      value={customerProfile.adminName}
                      onChange={(event) => updateCustomerProfile({ adminName: event.target.value })}
                      fullWidth
                      helperText="Designated Okta administrator for approvals."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Admin email"
                      value={customerProfile.adminEmail}
                      onChange={(event) =>
                        updateCustomerProfile({ adminEmail: event.target.value })
                      }
                      fullWidth
                      type="email"
                      helperText="Used for notifications, break-glass workflows, and MFA resets."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Support channel"
                      value={customerProfile.supportChannel}
                      onChange={(event) =>
                        updateCustomerProfile({
                          supportChannel: event.target.value,
                        })
                      }
                      fullWidth
                      placeholder="#okta-admins or distribution list"
                      helperText="Slack channel or mailing list to reach during incidents."
                    />
                  </Grid>
                </Grid>
              </MDBox>
            </MDBox>
          </Card>
        </Grid>
      </Grid>

      <MDBox my={3}>
        <Card>
          <MDBox p={3}>
            <MDTypography variant="h6" gutterBottom>
              Okta contract insights
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="regular">
              Track renewal readiness and kick off an AI contract review before negotiations.
            </MDTypography>
            <MDBox mt={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="Contract status"
                    value={contractInsights.contractStatus}
                    onChange={(event) =>
                      updateContractInsights({
                        contractStatus: event.target.value,
                      })
                    }
                    fullWidth
                    placeholder="Active, Draft, In review"
                    helperText="Summarize current negotiation state for leadership."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="Renewal date"
                    type="date"
                    value={contractInsights.renewalDate}
                    onChange={(event) =>
                      updateContractInsights({ renewalDate: event.target.value })
                    }
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    helperText="Capture the target renewal to back-calc internal milestones."
                  />
                </Grid>
                <Grid item xs={12}>
                  <MDInput
                    label="AI review notes"
                    value={contractInsights.aiReviewNotes}
                    onChange={(event) =>
                      updateContractInsights({
                        aiReviewNotes: event.target.value,
                      })
                    }
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Flag data residency, SLAs, or pricing levers for the AI agent."
                    helperText={
                      contractInsights.lastReviewed
                        ? `Last reviewed ${contractInsights.lastReviewed}`
                        : "Add context to accelerate clause summaries."
                    }
                  />
                </Grid>
              </Grid>
              <MDBox mt={2} display="flex" alignItems="center" gap={2}>
                <MDButton color="info" variant="gradient" onClick={handleAiReview}>
                  Trigger AI contract review
                </MDButton>
                {aiStatus && (
                  <MDTypography variant="button" color="success">
                    {aiStatus}
                  </MDTypography>
                )}
              </MDBox>
            </MDBox>
          </MDBox>
          <Divider />
          <MDBox p={3} display="flex" flexDirection="column" gap={1}>
            <MDTypography variant="button" color="text">
              Summary cards refresh automatically as you complete each section.
            </MDTypography>
            <MDTypography variant="button" color="text">
              Need a checklist? Ensure connection credentials are valid, federation metadata is
              monitored, finance contacts are named, and renewal milestones are captured.
            </MDTypography>
          </MDBox>
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}

export default Settings;
