import {
    NavLink
  } from "react-router-dom";

import React from "react"

    export default function Header({isLoggedIn, loginMsg, roles}) {
        //console.log("isLoggedIn: " + isLoggedIn);
        // If isLoggedIn is true the element after && is rendered

        return (
        <div>
            <ul className="header">
                <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
                <li><NavLink activeClassName="active" to="/login">{loginMsg}</NavLink></li>

                {!isLoggedIn && (
                <React.Fragment>
                    <li><NavLink activeClassName="active" to="/register">Register</NavLink></li>
                </React.Fragment>
                )}
                {isLoggedIn && roles==='["user"]' && (
                    <React.Fragment>
                        <li><NavLink activeClassName="active" to="/allPosts">All Posts</NavLink></li>
                        <li><NavLink activeClassName="active" to="/addPost">Add Post</NavLink></li>
                    </React.Fragment>
                )}
                {isLoggedIn && roles==='["admin"]' &&(
                    <React.Fragment>
                        <li><NavLink activeClassName="active" to="/allPosts">All Posts</NavLink></li>
                        <li><NavLink activeClassName="active" to="/addPost">Add Post</NavLink></li>
                        <li><NavLink activeClassName="active" to="/admin">Admin</NavLink></li>
                    </React.Fragment>
                )}
            </ul>
        </div>
        );
    }

  /*
export default function Header({roles}){
return(
    <ul className="header">
    <li><NavLink exact activeClassName="selected" to="/">Home</NavLink></li>
    <li><NavLink activeClassName="selected" to="/login">Login</NavLink></li>
    <li><NavLink activeClassName="selected" to="/register">Register</NavLink></li>
    <li><NavLink activeClassName="selected" to="/allPosts">All Posts</NavLink></li>
    <li><NavLink activeClassName="selected" to="/addPost">Add Post</NavLink></li>

    <li><NavLink activeClassName="selected" to="/post">Post</NavLink></li>
    {roles==='["admin"]' && <li><NavLink activeClassName="selected" to="/admin">Admin</NavLink></li>}

{/* 
    {roles==='["user"]' && <li><NavLink activeClassName="selected" to="/post">Post</NavLink></li>} */
/*}

    </ul>
);
}
*/