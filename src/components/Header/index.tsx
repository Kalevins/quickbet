import type { FC } from "react";
import Link from "next/link";

import { useAuth, useDarkMode, useModalLogin } from "@/contexts";
import { IconParkSolidDarkMode, IconUser, IconUserAuth, Logo } from "@/assets";

import styles from "./styles.module.css";
import { ModalLogin } from "../ModalLogin";

export const Header: FC = (): JSX.Element => {
  const { isDark, setDarkMode, setLightMode } = useDarkMode();
  const { handleOpenModal } = useModalLogin();
  const { isAuth } = useAuth();

  const darkModeHandler = (): void => {
    if (isDark) {
      return setLightMode();
    } else {
      return setDarkMode();
    }
  };

  return (
    <>
      <nav className={styles.header}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.links}>
          <Link href="/">
            <span>Popular</span>
          </Link>
          <Link href="/favorites">
            <span>Favorites</span>
          </Link>
        </div>
        <div className={styles.options}>
          <button
            onClick={() => handleOpenModal(true)}
            className={styles.darkMode}
          >
            {isAuth ? <IconUserAuth /> : <IconUser />}
          </button>
          <button onClick={darkModeHandler} className={styles.darkMode}>
            <IconParkSolidDarkMode />
          </button>
        </div>
      </nav>
      <ModalLogin />
    </>
  );
};
