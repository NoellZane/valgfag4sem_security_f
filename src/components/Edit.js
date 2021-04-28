import React, { useState, useEffect } from "react"
import pFacade from "../api/postFacade"
import aFacade from "../api/apiFacade"
import jwtdecode from "jwt-decode"



export default function Post({ loggedIn }) {
    const [data, setData] = useState([]);
    const [post, setPost] = useState("");
    const [title, setTitle] = useState("")
    const [username, setUsername] = useState("");

    
    useEffect(() => {
        pFacade.fetchPosts()
          .then((data) => {
            setData(data);
          });
      }, [])
      


    const handleChange = (event) => {
      event.preventDefault()
      const value = event.target.value 
      setPost(value);
    }
    

    const handleSubmit = (event) => {
      event.preventDefault()
      pFacade.addPost(post, username.username, title)
      .then(() => {
        pFacade.fetchPosts()
        .then((data) => {
          setData(data);
        })
      })

      setPost("");

    }

    useEffect(() => {
      if (loggedIn) {
        const token = aFacade.getToken();
        const decodedToken = jwtdecode(token);
        setUsername(decodedToken);

      }
    }, [loggedIn])

    const toShow = data ? (

      <div>
        {data.length > 0 ? data.map((m, index) => (
          <div key={index}>
            <p>{m.post}</p>
            <p>{m.username}</p>
            <p>{m.createdOn}</p>
          </div>

            //delete button her

        )) : (
          ""
        )}
    </div>
    ) : (
      "loading..."
    )

    return (

      <div className="container">
        <div className="row">
          <div className="col-10 text-center">
            <h3 className="mt-5">Make a post in CoffeeRoom</h3>

            <hr></hr>

            <textarea className="form-control"
            id="text"
            rows="5"
            onChange={handleChange}
            value={post}>
            </textarea>
            
            <hr></hr>
            
            <button type="submit"
            className="text-center"
            onClick={handleSubmit}>
              Add Post
            </button>

            {toShow}


            </div>
        </div>
      </div>
    )
}
  