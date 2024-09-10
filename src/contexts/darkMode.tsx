import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface DarkModeContextType {
  isDark: boolean;
  setDarkMode: () => void;
  setLightMode: () => void;
}

interface DarkModeProviderProps {
  children: ReactNode;
}

const DarkModeContext = createContext({
  isDark: false,
  setDarkMode: () => {},
  setLightMode: () => {},
} as DarkModeContextType);

export const useDarkMode = (): DarkModeContextType => {
  return useContext(DarkModeContext);
};

export const DarkModeProvider = ({
  children,
}: DarkModeProviderProps): JSX.Element => {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-background",
      isDark ? "var(--color-background-dark)" : "var(--color-background-light)",
    );
    document.documentElement.style.setProperty(
      "--color-background-opacity",
      isDark
        ? "var(--color-background-opacity-dark)"
        : "var(--color-background-opacity-light)",
    );
    document.documentElement.style.setProperty(
      "--color-background-inverted",
      isDark
        ? "var(--color-background-inverted-dark)"
        : "var(--color-background-inverted-light)",
    );
    document.documentElement.style.setProperty(
      "--color-background-inverted-opacity",
      isDark
        ? "var(--color-background-inverted-opacity-dark)"
        : "var(--color-background-inverted-opacity-light)",
    );
    document.documentElement.style.setProperty(
      "--color-text",
      isDark ? "var(--color-text-dark)" : "var(--color-text-light)",
    );
    document.documentElement.style.setProperty(
      "--color-text-inverted",
      isDark
        ? "var(--color-text-inverted-dark)"
        : "var(--color-text-inverted-light)",
    );
  }, [isDark]);

  const setDarkMode = (): void => {
    setIsDark(true);
  };

  const setLightMode = (): void => {
    setIsDark(false);
  };

  return (
    <DarkModeContext.Provider
      value={{
        isDark,
        setDarkMode,
        setLightMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
