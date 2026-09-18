import { useState } from 'react';
import { AuthContext } from './AuthContext';

const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

/**
 * Storage is wrapped because a browser in private mode, or with site data
 * blocked, throws on access rather than returning null.
 */
const safeGet = (store, key) => {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (store, key, value) => {
  try {
    store.setItem(key, value);
  } catch {
    /* Signing in still works for this tab; it just will not be remembered. */
  }
};

const safeRemove = (store, key) => {
  try {
    store.removeItem(key);
  } catch {
    /* nothing to clear */
  }
};

/**
 * "Keep me signed in" decides *which* store is used, and is the only difference
 * between the two: localStorage survives closing the browser, sessionStorage
 * does not. Either way the token itself still expires after eight hours.
 */
const readToken = () => safeGet(localStorage, TOKEN_KEY) ?? safeGet(sessionStorage, TOKEN_KEY);

const readUser = () => {
  const raw = safeGet(localStorage, USER_KEY) ?? safeGet(sessionStorage, USER_KEY);
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken);
  const [user, setUser] = useState(readUser);

  function login(jwt, profile, remember = false) {
    const store = remember ? localStorage : sessionStorage;
    const other = remember ? sessionStorage : localStorage;

    // Clear the store we are not using, so a previous "remember me" session
    // cannot outlive a later sign-in that asked not to be remembered.
    safeRemove(other, TOKEN_KEY);
    safeRemove(other, USER_KEY);

    safeSet(store, TOKEN_KEY, jwt);
    safeSet(store, USER_KEY, JSON.stringify(profile ?? null));

    setToken(jwt);
    setUser(profile ?? null);
  }

  function logout() {
    for (const store of [localStorage, sessionStorage]) {
      safeRemove(store, TOKEN_KEY);
      safeRemove(store, USER_KEY);
    }
    setToken(null);
    setUser(null);
  }

  // The stored role decides which navigation a member of staff sees. It is a
  // convenience for the UI only — the server re-checks the role on every call,
  // so editing storage grants nothing.
  const role = user?.role ?? null;
  const can = {
    seeEnquiries: role === 'admin' || role === 'headteacher',
    write: role === 'admin' || role === 'headteacher',
    manageStaff: role === 'headteacher',
  };

  return (
    <AuthContext.Provider value={{ token, user, role, can, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
