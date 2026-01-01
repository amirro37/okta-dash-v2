const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export const initiateGoogleOAuth = async ({ loginHint } = {}) => {
  const configuredUrl = process.env.REACT_APP_GOOGLE_OAUTH_URL;

  if (!configuredUrl) {
    throw new Error("Google OAuth URL is not configured. Provide REACT_APP_GOOGLE_OAUTH_URL.");
  }

  const redirectUrl = new URL(configuredUrl);
  if (loginHint) {
    redirectUrl.searchParams.set("login_hint", loginHint);
  }

  await delay();
  window.location.assign(redirectUrl.toString());
  return redirectUrl.toString();
};

export const initiateSsoEntry = async (protocol = "saml", { loginHint } = {}) => {
  const envVar = protocol === "oidc" ? "REACT_APP_OIDC_ENTRYPOINT" : "REACT_APP_SAML_ENTRYPOINT";
  const configuredUrl = process.env[envVar];

  if (!configuredUrl) {
    throw new Error(`${protocol.toUpperCase()} entrypoint is not configured. Set ${envVar}.`);
  }

  const redirectUrl = new URL(configuredUrl);
  if (loginHint) {
    redirectUrl.searchParams.set("login_hint", loginHint);
  }

  await delay(150);
  window.location.assign(redirectUrl.toString());
  return redirectUrl.toString();
};

export default {
  initiateGoogleOAuth,
  initiateSsoEntry,
};
