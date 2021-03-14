import React, { ReactElement } from 'react';
import styles from './table.module.css';

type Props = { children: React.ReactNode };

function Table({ children }: Props): ReactElement | null {
  return (
    <div className={styles.tableWrapper}>
      <table>{children}</table>
    </div>
  );
}

export default Table;
