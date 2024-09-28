import React, { createContext, useState, useEffect, ReactNode } from "react";
import TokenService from "@/services/token.service";
import { AuthState } from "@/lib/types/auth.type";

export interface AuthContextType extends AuthState {
  login: (access: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await TokenService.getAccessToken();
      if (token) {
        const userDecode = await TokenService.getUser();
        if (userDecode && userDecode.user) {
          setState({
            user: userDecode.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setState({ user: null, isAuthenticated: false, isLoading: false });
        }
      } else {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    initializeAuth();
  }, []);

  const login = async (access: string) => {
    const user = await TokenService.getUserFromToken(access);
    setState({ user: user ?? null, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    TokenService.removeToken();
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };


  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
