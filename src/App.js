import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import React, { useState } from "react"
import facade from "./api/apiFacade";

import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Header from "./components/Header";
import Register from "./components/Register";
import AllPosts from "./components/AllPosts";
import Admin from "./components/Admin";
//import Post from "./components/Post";
import AddPost from "./components/AddPost";
import { LogIn, LoggedIn } from "./components/Login.js";
import MyPosts from "./components/MyPosts";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
  

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);
  // loginMsg changes from Login to Logout depending on the users status
  const [loginMsg, setLoginMsg] = useState("Login");

  let history = useHistory();

  const logout = () => {   
    setLoginMsg("Login");
    facade.logout();
    setLoggedIn(false);
    history.push("/");
  } 

  const login = (user, pass) => { 
    setLoginMsg("Logout")
    facade.login(user,pass,setRoles)
    //console.log(roles)
    .then(res =>setLoggedIn(true) && history.push("/"))
    .catch(err => {
      if (err.status) {
        err.fullError.then(e => {
          console.log(e.message)
          alert(e.message)
          })
      } 
      else { alert("Network error"); }
    })
   } 
 
    return(
      <Router>
        <div>
          <Header 
            loginMsg={loginMsg}
            isLoggedIn={isLoggedIn}
            roles={roles} 
          />

          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/login">
                {!isLoggedIn ? (<LogIn login={login} />) :
                  (<div>
                  <LoggedIn roles={roles}/>
                  <button onClick={logout}>{loginMsg}</button>
                </div>)}
              </Route>

              <Route path ="/register">
                <Register />
              </Route>


              <Route path="/allPosts">
                {!isLoggedIn ? (<NoMatch />) :
                  (<AllPosts />)}
              </Route>

              <Route path ="/myPosts">
                {!isLoggedIn ? (<NoMatch />) :
                (<MyPosts loggedIn={isLoggedIn}/>)}
              </Route>

              <Route path ="/addPost">
                {!isLoggedIn ? (<NoMatch />) :
                (<AddPost loggedIn={isLoggedIn}/>)}
              </Route>

              <Route path ="/admin">
                {!isLoggedIn ? (<NoMatch />) :
                (<Admin />)}
              </Route>

              <Route>
                <NoMatch />
              </Route>

            </Switch>
          </div>  
        </div>
      </Router>
    );
}

export default App;