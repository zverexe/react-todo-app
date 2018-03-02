import React from 'react';
import './spinner.scss';

const spinner = () => {
  return(
    <div className="loader-wrapper">
      <div id="loader">
        <div id="box"></div>
        <div id="hill"></div>
      </div>
    </div>
  )
};

export default spinner;