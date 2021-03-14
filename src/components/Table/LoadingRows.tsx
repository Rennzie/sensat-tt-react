import React, { ReactElement } from 'react';

const NO_DATA = '---';

function LoadingRows(): ReactElement {
  const [count, setCount] = React.useState([0]);

  React.useEffect(() => {
    setTimeout(() => {
      // random key ensures dom is updated correctly
      const randomKey = Math.floor(Math.random() * 10000);
      if (count.length <= 3) {
        setCount([...count, randomKey]);
      } else {
        setCount([randomKey]);
      }
    }, 300);
  }, [count]);

  return (
    <>
      {count.map((row) => (
        <tr key={row}>
          <td> {NO_DATA} </td>
          <td> {NO_DATA} </td>
          <td> {NO_DATA} </td>
          <td> {NO_DATA} </td>
          <td> {NO_DATA} </td>
          <td> {NO_DATA} </td>
          <td> {NO_DATA} </td>
          <td> {NO_DATA} </td>
          <td> {NO_DATA} </td>
        </tr>
      ))}
    </>
  );
}

export default LoadingRows;
