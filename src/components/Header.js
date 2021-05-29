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
                        <li><NavLink activeClassName="active" to="/myProfile">My Profile</NavLink></li>
                        <li><NavLink activeClassName="active" to="/allPosts">All Posts</NavLink></li>
                        <li><NavLink activeClassName="active" to="/myPosts">My Posts</NavLink></li>
                    </React.Fragment>
                )}
                {isLoggedIn && roles==='["admin"]' &&(
                    <React.Fragment>
                        <li><NavLink activeClassName="active" to="/allPosts">All Posts</NavLink></li>
                        <li><NavLink activeClassName="active" to="/myPosts">My Post</NavLink></li>
                        <li><NavLink activeClassName="active" to="/admin">Admin</NavLink></li>
                    </React.Fragment>
                )}
            </ul>
        </div>
        );
    }
