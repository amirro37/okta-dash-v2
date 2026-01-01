import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const ApiContext = createContext();

const STORAGE_KEY = "oktaDashboardApiContext";

const defaultApiCalls = [
  {
    name: "List Users",
    method: "GET",
    path: "/api/v1/users",
    filter: "?limit=200",
    description: "Retrieve all active users with a default pagination limit.",
  },
  {
    name: "List Groups",
    method: "GET",
    path: "/api/v1/groups",
    filter: "?limit=200",
    description: "Pull groups for mapping assignments or audits.",
  },
  {
    name: "List Applications",
    method: "GET",
    path: "/api/v1/apps",
    filter: "",
    description: "Fetch all applications available in the tenant.",
  },
  {
    name: "List Events",
    method: "GET",
    path: "/api/v1/logs",
    filter: '?filter=eventType+eq+"user.session.start"',
    description: "Starter filter for sign-in events (customize as needed).",
  },
];

const loadPersistedState = () => {
  const envState = {
    baseUrl: process.env.REACT_APP_OKTA_BASE_URL || "",
    apiToken: process.env.REACT_APP_OKTA_API_TOKEN || "",
    persistCredentials: true,
    apiCalls: defaultApiCalls,
  };

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return envState;
    }

    const parsed = JSON.parse(stored);
    return {
      baseUrl: parsed.baseUrl || envState.baseUrl,
      apiToken: parsed.apiToken || envState.apiToken,
      persistCredentials:
        typeof parsed.persistCredentials === "boolean"
          ? parsed.persistCredentials
          : envState.persistCredentials,
      apiCalls:
        Array.isArray(parsed.apiCalls) && parsed.apiCalls.length > 0
          ? parsed.apiCalls
          : defaultApiCalls,
    };
  } catch (error) {
    return envState;
  }
};

function ApiProvider({ children }) {
  const [state, setState] = useState(loadPersistedState);

  useEffect(() => {
    if (state.persistCredentials) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  const updateCredentials = useCallback(({ baseUrl, apiToken, persistCredentials }) => {
    setState((prev) => ({
      ...prev,
      baseUrl: typeof baseUrl === "string" ? baseUrl : prev.baseUrl,
      apiToken: typeof apiToken === "string" ? apiToken : prev.apiToken,
      persistCredentials:
        typeof persistCredentials === "boolean" ? persistCredentials : prev.persistCredentials,
    }));
  }, []);

  const addApiCall = useCallback((newCall) => {
    setState((prev) => ({
      ...prev,
      apiCalls: [...prev.apiCalls, { ...newCall, id: `${Date.now()}-${prev.apiCalls.length}` }],
    }));
  }, []);

  const value = useMemo(
    () => ({
      baseUrl: state.baseUrl,
      apiToken: state.apiToken,
      apiCalls: state.apiCalls,
      persistCredentials: state.persistCredentials,
      updateCredentials,
      addApiCall,
    }),
    [addApiCall, state, updateCredentials]
  );

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useApi = () => {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }

  return context;
};

export { ApiProvider, useApi };
