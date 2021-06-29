import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <div id="loaderWrapper">
      <Loader type="BallTriangle" color="#fc3333" height={100} width={100} />
    </div>
  );
};

export { Loading };
