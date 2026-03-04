import React, { createContext, useContext, useState, useCallback } from "react";
import type { User } from "@/types/auth";
import { loginUser, logoutUser } from "@/api/auth.api";

// Auth context for the application

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mtb_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    if (response.status !== 200 || !response.data) {
      throw new Error(response.message);
    }
    localStorage.setItem("mtb_user", JSON.stringify(response.data.user));
    localStorage.setItem("mtb_token", response.data.token);
    localStorage.setItem("mtb_refresh_token", response.data.refreshToken);
    setUser(response.data.user);
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    localStorage.removeItem("mtb_user");
    localStorage.removeItem("mtb_token");
    localStorage.removeItem("mtb_refresh_token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
