import React from 'react';

const WarningBanner = (props) => {
  // console.log('WarningBanner props = ', props);
  if (!props.message) {
    return null;
  }

  return (
    <div className="alert alert-warning">{ props.message }</div>
  );
};

export default WarningBanner;
