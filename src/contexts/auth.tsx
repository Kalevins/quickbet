import { validate } from "@/api";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isAuth: boolean;
  handleIsAuth: (value: boolean) => void;
  handleVerification: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({
  isAuth: false,
  handleIsAuth: () => {},
  handleVerification: () => {},
} as AuthContextType);

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [verification, setVerification] = useState<boolean>(false);

  const handleVerification = (): void => {
    setVerification(!verification);
  };

  const handleIsAuth = (value: boolean): void => {
    setIsAuth(value);
  };

  useEffect(() => {
    validate()
      .then(() => {
        setIsAuth(true);
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, [verification]);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        handleIsAuth,
        handleVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
