import { Route, Switch } from "react-router-dom";
import "./styles/normalize.css";
import "./styles/global.css";

import { Home } from "./pages";

const App = () => {
  return (
    <Switch>
      <Route exact path={["/home", "/"]} component={Home} />
    </Switch>
  );
};

export default App;
