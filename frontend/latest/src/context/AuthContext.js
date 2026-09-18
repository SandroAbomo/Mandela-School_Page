import { createContext, useContext } from 'react';

/**
 * The context and its hook live here, apart from the provider component in
 * AuthProvider.jsx: a module that exports both a component and a non-component
 * breaks Fast Refresh.
 */
export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
