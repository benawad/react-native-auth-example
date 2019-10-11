import { createContext } from "react";

export interface AuthPayload {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export const UserContext = createContext<{
  authPayload: AuthPayload;
  setAuthPayload: (authPayload: AuthPayload) => void;
  logout: () => void;
}>(null);
