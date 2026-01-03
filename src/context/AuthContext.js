import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

const STORAGE_KEY = "oktaDashboardAuth";

const loadAuthState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { token: null, user: null };
    const parsed = JSON.parse(stored);
    return {
      token: parsed.token || null,
      user: parsed.user || null,
    };
  } catch (error) {
    return { token: null, user: null };
  }
};

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => loadAuthState().token);
  const [user, setUser] = useState(() => loadAuthState().user);

  useEffect(() => {
    if (token) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          token,
          user,
        })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [token, user]);

  const login = useCallback((sessionToken, userProfile = null) => {
    setToken(sessionToken);
    setUser(userProfile);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      user,
      login,
      logout,
    }),
    [login, logout, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
