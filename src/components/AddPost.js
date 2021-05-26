import pfacade from "../api/postFacade"
import afacade from "../api/apiFacade"
import React, { useState, useEffect } from "react";
import jwtdecode from "jwt-decode";

export default function AddPost({ loggedIn }) {
    const emptyPost = {
        title: "",
        text: "",
        username: ""
    }

    const [newPost, setNewPost] = useState({...emptyPost});
    const [username, setUsername] = useState("")
    

    const handleChange = (evt) => {
      setNewPost({...newPost, [evt.target.id]: evt.target.value})
    }
    

    const handleSubmit = (evt) => {
      evt.preventDefault()
      setNewPost({...emptyPost})
      newPost.username = username;
      pfacade.addPost(newPost)
    }

    /*--------------------------------------------------------------*/

    useEffect(() => {
      if (loggedIn) {
        const token = afacade.getToken();
        const decodedToken = jwtdecode(token);
        
        setUsername(decodedToken.username);
      }
    }, [loggedIn])

    /*--------------------------------------------------------------*/

    return (
    
        <div className="container">
          <div className="row">
            <div className="col-5 text-center">
              <h4 className="mt-5">Add a post</h4>
              <hr></hr>

              <form className="addPost-form" onSubmit={handleSubmit}>

                <input 
                onChange={handleChange}
                value={newPost.title}
                className = "form-field"
                placeholder = "Title"
                id = "title"/>

                <input 
                onChange={handleChange}
                value={newPost.text}
                className = "form-field"
                placeholder = "Text"
                id = "text"/>  


                <button className = "form-field" type="submit">Add Post</button>

              </form>
            </div>
          </div>
        </div>
    )
}
