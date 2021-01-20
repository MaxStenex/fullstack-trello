import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthState } from "../state/user/UserContext";

type PrivateRouteProps = {
  component: React.FunctionComponent;
} & RouteProps;

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const user = useAuthState();

  return (
    <Route {...rest} render={() => (user ? <Component /> : <Redirect to="/login" />)} />
  );
};
