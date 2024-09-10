import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LoadingScreenContextType {
  isLoadingScreen: boolean;
  handleIsLoadingScreen: (value: boolean) => void;
}

interface LoadingScreenProviderProps {
  children: ReactNode;
}

const LoadingScreenContext = createContext({
  isLoadingScreen: false,
  handleIsLoadingScreen: () => {},
} as LoadingScreenContextType);

export const useLoadingScreen = (): LoadingScreenContextType => {
  return useContext(LoadingScreenContext);
};

export const LoadingScreenProvider = ({
  children,
}: LoadingScreenProviderProps): JSX.Element => {
  const [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(false);

  const handleIsLoadingScreen = (value: boolean): void => {
    setIsLoadingScreen(value);
  };

  return (
    <LoadingScreenContext.Provider
      value={{
        isLoadingScreen,
        handleIsLoadingScreen,
      }}
    >
      {children}
    </LoadingScreenContext.Provider>
  );
};
