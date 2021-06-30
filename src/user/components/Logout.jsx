import React, { useEffect } from "react";
import { setUser2 } from "../../reduxStore/actions";
import { useDispatch } from "react-redux";

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.clear();
    dispatch(setUser2({ isAuthenticated: false }));
  }, [dispatch]);

  return <h2>You have successfully logged out</h2>;
}

export default Logout;
