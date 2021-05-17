import React from "react";
import { Route } from "react-router-dom";
import Forbiden from "../pages/forbiden/Forbiden";
import AuthLayout from "../components/layout/AuthLayout";
import BasicLayout from "../components/layout/BasicLayout";

const PrivateRoute = ({ component: Component, isPrivate, ...rest }) => {
  const Layout = isPrivate ? AuthLayout : BasicLayout;

  return (
    <Route
      {...rest}
      component={() => {
        return isPrivate ? (
          localStorage.getItem("jwt-token") ? (
            <Layout>
              <Component {...rest} />
            </Layout>
          ) : (
            <Forbiden />
          )
        ) : (
          <Layout>
            <Component {...rest} />
          </Layout>
        );
      }}
    />
  );
};

export default PrivateRoute;
