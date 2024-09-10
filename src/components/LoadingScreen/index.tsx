import type { FC } from "react";
import { Loading } from "@/components";
import { useLoadingScreen } from "@/contexts";

import styles from "./styles.module.css";

export const LoadingScreen: FC = (): JSX.Element => {
  const { isLoadingScreen } = useLoadingScreen();

  if (isLoadingScreen) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  return <></>;
};
