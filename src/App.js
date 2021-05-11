import "./App.css";

import { Switch, Route } from "react-router-dom";
import Books from "./pages/books/Books";
import Movies from "./pages/movies/Movies";
import People from "./pages/people/People";
import Login from "./pages/login/Login";

import PrivateRoute from "./privateRoute/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <PrivateRoute path="/books" exact component={Books} isPrivate />
        <PrivateRoute path="/movies" exact component={Movies} isPrivate />
        <PrivateRoute path="/people" exact component={People} isPrivate />
      </Switch>
    </div>
  );
}

export default App;
