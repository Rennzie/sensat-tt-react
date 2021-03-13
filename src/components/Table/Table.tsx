import React, { ReactElement } from 'react';
import classNames from 'classnames';
import styles from './table.module.css';

type Props = {};

function Table({}: Props): ReactElement {
  return (
    <table className={classNames(styles.tableRoot, styles.stickHead)}>
      <thead className={styles.stickHead}>
        <tr>
          <th className={styles.stickHead}>ID</th>
          <th>Box ID</th>
          <th>Sensor Type</th>
          <th>Name</th>
          <th>Range Lower</th>
          <th>Range Upper</th>
          <th>Reading</th>
          <th>unit</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A1</td>
          <td>A2</td>
          <td>A2</td>
          <td>A2</td>
          <td>A2</td>
          <td>A2</td>
          <td>A2</td>
          <td>A2</td>
          <td>A2</td>
        </tr>
        <tr>
          <td>B1</td>
          <td>B2</td>
        </tr>
        <tr>
          <td>C1</td>
          <td>C2</td>
        </tr>
        <tr>
          <td>D1</td>
          <td>D2</td>
        </tr>
        <tr>
          <td>E1</td>
          <td>E2</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
