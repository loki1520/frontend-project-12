import React from 'react';

const Wrapper = ({ children }) => (
  <div
    style={{
      minHeight: '100vh',
      minWidth: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    {children}
  </div>
);

export default Wrapper;
