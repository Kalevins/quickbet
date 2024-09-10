import type { FC } from "react";

import styles from "./styles.module.css";

export const Loading: FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <span className={styles.loader} />
    </div>
  );
};
