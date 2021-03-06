import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Books from "./pages/books/Books";
import Movies from "./pages/movies/Movies";
import People from "./pages/people/People";
import Login from "./pages/login/Login";
import MoviesForm from "./pages/movies/MoviesForm";
import BooksForm from "./pages/books/BooksForm";
import PeopleForm from "./pages/people/PeopleForm";
import PrivateRoute from "./privateRoute/PrivateRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import Register from "./pages/register/Register";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <PrivateRoute path="/books" exact component={Books} isPrivate />
            <PrivateRoute path="/books/:id" exact component={BooksForm} isPrivate />
            <PrivateRoute path="/movies" exact component={Movies} isPrivate />
            <PrivateRoute path="/movies/:id" exact component={MoviesForm} isPrivate />
            <PrivateRoute path="/people" exact component={People} isPrivate />
            <PrivateRoute path="/people/:id" exact component={PeopleForm} isPrivate />
            <PrivateRoute path="/register" exact component={Register} />
          </Switch>
        </BrowserRouter>
      </div>
    </QueryClientProvider>


  );
}

export default App;
