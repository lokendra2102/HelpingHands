
import React, { useContext, useEffect } from 'react';
import { userContext } from '../userContext';
  
const SignOut = () => {
  let {setUser} = useContext(userContext)

  useEffect(() => {
    // clean user context and go back to the sign in screen
    setUser({});
    window.location.replace("/")
  })
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        height: '100vh',
        backgroundColor: "#f2f2f2",
        padding: "0.2rem calc((100vw - 1000px) / 10)"
      }}
    >
    </div>
  );
};
  
export default SignOut;