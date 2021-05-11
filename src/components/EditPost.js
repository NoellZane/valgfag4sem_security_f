import pfacade from "../api/postFacade"
import afacade from "../api/apiFacade"
import React, { useState, useEffect } from "react";
import jwtdecode from "jwt-decode"

export default function EditPost({ loggedIn }) {
    const emptyPost = {
        title: "",
        text: ""
    }

    // Sætter newPost til at være den gamle post
    // Updatere title og eller text og sætter den nye post og kalder edit metoden på den nye post

    const [newPost, setNewPost] = useState({...emptyPost});
    const [id, setID] = useState(0)
    const [msg, setMsg] = useState("")
    

    const handleChange = (evt) => {
      setNewPost({...newPost, [evt.target.id]: evt.target.value})
    }
    const handleChangeId = (evt) => {
        setID(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setNewPost({...emptyPost});
        pfacade.editPost(id, newPost);
        if (evt.error && this.state.errorInfo) {
            setMsg(this.state.error.toString())
        } 
        
    }


    return (
    
        <div className="container">
          <div className="row">
            <div className="col-5 text-center">
              <h4 className="mt-5">Edit a post</h4>
              <hr></hr>

              <form className="editPost-form" onSubmit={handleSubmit}>

                <input 
                onChange={handleChangeId}
                type="number"
                className = "form-field"
                placeholder = "ID of the post"
                id = "id"/>

                <input 
                onChange={handleChange}
                value={newPost.title}
                className = "form-field"
                placeholder = "New title"
                id = "title"/>

                <input 
                onChange={handleChange}
                value={newPost.text}
                className = "form-field"
                placeholder = "New text"
                id = "text"/>  


                <button className = "form-field" type="submit">Edit Post</button>

              </form>
            </div>
                {msg}
          </div>
        </div>
    )
}
