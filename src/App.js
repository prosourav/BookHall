
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import AddBook from './components/AddBook/AddBook';
import { createContext, useState } from 'react';
import ManageBooks from './components/ManageBooks/ManageBooks';
import CheckOut from './components/CheckOut/CheckOut';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';
import Order from './components/Order/Order';

export const bookContext = createContext();
export const userContext = createContext();

function App() {
  const [books, setBooks] = useState([]);
  const [loggedInUser,setLoggedInUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    error:'',
    message:''
  });
  return (
    <bookContext.Provider value = {[books, setBooks]}>
    <userContext.Provider value = {[loggedInUser,setLoggedInUser]}>
    <Router>
    <div className='App'>
    <Switch>
        <Route exact path="/">
        <Home></Home>
        </Route>

        <Route path="/home">
        <Home></Home>
        </Route>

        <PrivateRoute  path="/addBooks">
        <AddBook></AddBook>
        </PrivateRoute>

        <Route path="/login">
        <Login/>
        </Route>

        <PrivateRoute path="/manage">
        <ManageBooks/>
        </PrivateRoute>

        <PrivateRoute path="/order">
        <Order/>
        </PrivateRoute>

        <PrivateRoute path="/checkOut/:bookId">
          <CheckOut/>
        </PrivateRoute>

        
        <PrivateRoute path="/order">
          <Order/>
        </PrivateRoute>

        <Route path="*">
        <h1 style={{margin:'10%'}}>Oops... Page Not found</h1>
        </Route>

    </Switch>
    </div>
    </Router>
    </userContext.Provider>
    </bookContext.Provider>
   
  );
}

export default App;
