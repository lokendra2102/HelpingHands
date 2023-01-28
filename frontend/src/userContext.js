import React from 'react';

const userContext = React.createContext({
    user: {},
    setUser: () => {},
  });

export { userContext };