import React, { useState,useEffect } from "react"
import facade from "./api/apiFacade";
import "./App.css"
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import Header from "./components/Header";
import Register from "./components/Register";
import AllPosts from "./components/AllPosts";
import Admin from "./components/Admin";
import Post from "./components/Post";
import AddPost from "./components/AddPost";

import { LogIn, LoggedIn } from "./components/Login.js";


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
  

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [roles, setRoles] = useState([]);

  const logout = () => {    
    facade.logout()
    setLoggedIn(false) } 

  const login = (user, pass) => { 
    facade.login(user,pass,setRoles)
    //console.log(roles)
    .then(res =>setLoggedIn(true))
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
      <div>
  <Header roles={roles} />
  <Switch>
    <Route exact path="/">
      <Home />
    </Route>
    <Route path="/login">
    {!loggedIn ? (<LogIn login={login} />) :
   (<div>
   <LoggedIn roles={roles}/>
   <button onClick={logout}>Logout</button>
    </div>)}
    </Route>
    <Route path ="/register">
      <Register />
    </Route>
    <Route path ="/allPosts">
      <AllPosts />
    </Route>
    <Route path ="/addPost">
      <AddPost />
    </Route>


    <Route>
      <Admin />
    </Route>
    <Route>
      <NoMatch/>
    </Route>

    <Route>
      <Post />
    </Route>

  </Switch>
  </div>
    );
}

export default App;
