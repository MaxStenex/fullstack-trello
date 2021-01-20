import "./styles/normalize.css";
import "./styles/global.css";

import { Route, Switch } from "react-router-dom";

import { Login, Signup, Home, Tasks } from "./pages";
import { UserContext } from "./state/user/UserContext";

const App = () => {
  return (
    <UserContext>
      <Switch>
        <Route exact path={["/home", "/"]} component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/tasks" component={Tasks} />
      </Switch>
    </UserContext>
  );
};

export default App;
