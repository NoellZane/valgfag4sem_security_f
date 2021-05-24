
import pfacade from "../api/postFacade"
import afacade from "../api/apiFacade"
import React, { useState, useEffect } from "react";
import jwtdecode from "jwt-decode"
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import AllPostsByUser from "./AllPostsByUser";

export default function MyPosts({ loggedIn }){

    // AddPosts
    // AllPosts with delete and edit


    return (
        <React.Fragment>
            <div className="container">

              <div className="row">
                  <div className="col-6">
                    <AddPost loggedIn={loggedIn}/>
                    <EditPost loggedIn={loggedIn}/>
                  </div>
                  
                <AllPostsByUser loggedIn={loggedIn}/>
                
              </div>
            </div>
        </React.Fragment>
    )
}