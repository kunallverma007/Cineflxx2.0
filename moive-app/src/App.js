import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import  SignUp_user  from "./components/SignUp/SignUp_user"
import  SignUp_theater  from "./components/SignUp/SignUp_theater"

import Signin_user from "./components/SignIn/Signin_user"
import Signin_theater from "./components/SignIn/Signin_theater"
import Test from "./Test"
import Conc_theater from "./components/Movie_Search/Conc_theater"
import Search  from "./components/Movie_Search/Search"
import ShowTheater  from "./components/Form/ShowTheater"
import Card from "./components/Movie_Search/Card"
import AddBooking from './components/Form/AddBooking';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signup_user" component={SignUp_user}/>
        <Route exact path="/signup_theater" component={SignUp_theater}/>
        <Route exact path="/login_user" component={Signin_user}/>
        <Route exact path="/login_theater" component={Signin_theater}/>
        <Route exact path="/" component={Test}/>
        <Route path="/conc" component={Conc_theater}/>
        
        <Route path="/search" component={Search}/>
        <Route exact path="/AddBooking/:theater_id/:movie_id" component={AddBooking}/>
        <Route exact path="/show_movie/:movie_id" component={ShowTheater}/>
        <Route exact path="/card" component={Card}/>
        <Route exact path="/test" component={Test}/>
      </Switch>
    </Router>
  );
}

export default App;
