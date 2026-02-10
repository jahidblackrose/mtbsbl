import React, { createContext, useContext, useState, useCallback } from "react";
import type { User, UserRole } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User> = {
  "rm@mtb.com": { id: "1", name: "Karim Ahmed", email: "rm@mtb.com", role: "branch_rm", branch: "Gulshan" },
  "cib@mtb.com": { id: "2", name: "Nadia Islam", email: "cib@mtb.com", role: "cib" },
  "uw@mtb.com": { id: "3", name: "Rafiq Hasan", email: "uw@mtb.com", role: "underwriting" },
  "cad@mtb.com": { id: "4", name: "Sadia Rahman", email: "cad@mtb.com", role: "cad" },
  "mgl@mtb.com": { id: "5", name: "Tanvir Alam", email: "mgl@mtb.com", role: "mgl" },
  "div@mtb.com": { id: "6", name: "Farhana Begum", email: "div@mtb.com", role: "sme_division" },
  "admin@mtb.com": { id: "7", name: "System Admin", email: "admin@mtb.com", role: "admin" },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("mtb_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login — in production this would call the API
    const mockUser = MOCK_USERS[email.toLowerCase()];
    if (!mockUser) throw new Error("Invalid credentials");
    localStorage.setItem("mtb_user", JSON.stringify(mockUser));
    localStorage.setItem("mtb_token", "mock-jwt-token");
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("mtb_user");
    localStorage.removeItem("mtb_token");
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
