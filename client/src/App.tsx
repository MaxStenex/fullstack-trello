import "./styles/normalize.css";
import "./styles/global.css";

import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { Login, Signup, Home, Tasks } from "./pages";
import { PrivateRoute } from "./utils/PrivateRoute";
import { useAuhDispatch, useAuthState } from "./state/user/UserContext";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "./graphql/query/me";
import { MeQueryResponseType } from "./types/graphql";
import { setLoaded, setLoading, setUser } from "./state/user/actions";

const App = () => {
  const { loading: userIsLoading } = useAuthState();

  const authDispatch = useAuhDispatch();
  const { data, loading } = useQuery<MeQueryResponseType>(ME_QUERY);

  useEffect(() => {
    authDispatch(setLoading());

    if (data?.me.user) {
      authDispatch(setUser(data?.me.user));
    }
    if (data?.me.errors) {
      authDispatch(setLoaded());
    }
  }, [authDispatch, data?.me.user, data?.me.errors]);

  return loading || userIsLoading ? (
    <div>Loading...</div>
  ) : (
    <Switch>
      <Route exact path={["/home", "/"]} component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/tasks" component={Tasks} />
    </Switch>
  );
};

export default App;
