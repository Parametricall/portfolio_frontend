import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { setUser2, setUserAuthenticated } from "../reduxStore/actions";
import { getuserDetails } from "./Authorization";

async function ProtectedRoute(props) {
  const { children, setUserAuthenticated, path, permissions, ...rest } = props;

  const authenticated = localStorage.getItem("user");

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return authenticated ? children : <Redirect to="/login" />;
      }}
    />
  );
}

function mapStateToProps(state, ownProps) {
  // Leaving here as example for future, but does not actually do anything
  const authenticated = localStorage.getItem("user");
  return {
    authenticated,
  };
}

export default connect(mapStateToProps, { setUserAuthenticated })(
  ProtectedRoute
);
