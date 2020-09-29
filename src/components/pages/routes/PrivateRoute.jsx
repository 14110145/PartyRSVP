import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../../context/authContext/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userAuth, reLogin } = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      reLogin();
    }
    // eslint-disable-next-line
  }, [userAuth]);
  return (
    <Route
      {...rest}
      render={(props) => {
        return !userAuth ? <Redirect to="/login" /> : <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
