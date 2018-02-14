import React from 'react';
import styles from './spinner.scss';

const spinner = () => {
  return(
    <div className={styles.loader_wrapper}>
      <div id={styles.loader}>
        <div id={styles.box}></div>
        <div id={styles.hill}></div>
      </div>
    </div>
  )
};

export default spinner;