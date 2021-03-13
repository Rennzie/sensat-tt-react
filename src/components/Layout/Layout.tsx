import React, { ReactElement } from 'react';
import styles from './layout.module.css';

type Props = { children: React.ReactNode };
function Layout({ children }: Props): ReactElement {
  return <main className={styles.layoutRoot}>{children}</main>;
}

export default Layout;
