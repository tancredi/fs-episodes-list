import type { FunctionComponent, PropsWithChildren } from "react";
import styles from "./Layout.module.css";

import background from "./assets/space-background@2x.jpg";
import logo from "./assets/logo@2x.png";

export const Layout: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => (
  <>
    <img className={styles.background} src={background.src} />

    <div className={styles.page}>
      <img className={styles.logo} src={logo.src} alt="Final Space logo" />

      {children}
    </div>
  </>
);
