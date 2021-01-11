import "./styles/normalize.css";
import "./styles/global.css";

import { Route, Switch } from "react-router-dom";

import { Login, Signup, Home } from "./pages";

const App = () => {
  return (
    <Switch>
      <Route exact path={["/home", "/"]} component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
};

export default App;
