import React from 'react';


function Logout(props) {
  const {logout} = props;
  logout();
  return (
    <h2>You have successfully logged out</h2>
  );
}

export default Logout;