import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface ModalLoginContextType {
  isOpen: boolean;
  handleOpenModal: (value: boolean) => void;
}

interface ModalLoginProviderProps {
  children: ReactNode;
}

const ModalLoginContext = createContext({
  isOpen: false,
  handleOpenModal: () => {},
} as ModalLoginContextType);

export const useModalLogin = (): ModalLoginContextType => {
  return useContext(ModalLoginContext);
};

export const ModalLoginProvider = ({
  children,
}: ModalLoginProviderProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = (value: boolean): void => {
    setIsOpen(value);
  };

  return (
    <ModalLoginContext.Provider
      value={{
        isOpen,
        handleOpenModal,
      }}
    >
      {children}
    </ModalLoginContext.Provider>
  );
};
