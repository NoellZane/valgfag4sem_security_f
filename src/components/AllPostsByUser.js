
import React, { useState, useEffect } from "react"
import facade from "../api/postFacade"
import afacade from "../api/apiFacade"
import "bootstrap/dist/css/bootstrap.min.css";
import jwtdecode from "jwt-decode"
import '../App.css';

  export default function AllPostsByUser({ loggedIn }) {

    const emptyPost = {
        title: "",
        text: ""
    }

    const [posts, setPosts] = useState([])
    const [render, setRender] = useState(false);
    const [usernameButton, setUsernameButton] = useState(false);
    const [newPost, setNewPost] = useState({...emptyPost});
    const [tableRows, setTableRows] = useState("");
    const [title, setTitle] = useState("");

    function fetchPosts(username){
        facade.getPostsByUser(username)
          .then((data) => {
            setPosts(data.allPosts);
          });
          console.log("Username: " + username);
          setUsernameButton(username);
    }

    function deletePost(evt){
        evt.preventDefault();
        facade.deletePost(evt.target.id);
        setRender(!render);
    }
    function editPost(evt){
        evt.preventDefault();
        console.log("Title: " + newPost.title)
        facade.editPost(evt.target.id, newPost)
    }

    function reload(evt){
        evt.preventDefault();
        fetchPosts(usernameButton);
    }

    useEffect(() => {
        if (loggedIn) {
          const token = afacade.getToken();
          const decodedToken = jwtdecode(token);
          fetchPosts(decodedToken.username);
        };
    }, [loggedIn])


    const handleChange = (evt) => {
        setNewPost({...newPost, [evt.target.id]: evt.target.value})
    }
    function myChangeHandler(event){
        let titleT = event.target.title;
        setTitle(titleT);
        let text = event.target.text;
        setNewPost({...emptyPost})
        newPost.title = title;
        newPost.text = text;
        console.log("myChangeHandler: " + newPost.title);
        console.log("myChangeHandler2: " + title);
        //facade.editPost(newPost)

        console.log(title)
    }
      
    
    const displayPosts = setTableRows ? (
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Post id:</th>
                <th scope="col">Post title:</th>
                <th scope="col">Post text:</th>
                <th scope="col">Post created:</th>
                <th scope="col">Post edited:</th>
                <th scope="col"></th>
              </tr>
            </thead>
    
            <tbody>
                {posts.map(p =>
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.title}</td>
                        <td>{p.text}</td>
                        <td>{p.dateCreated}</td>
                        <td>{p.lastEdited}</td>
                        <td>
                            <button id={p.id} onClick={deletePost}>Delete</button>
                        </td>
                    </tr>)}
            </tbody>
          </table>
        </div>
      ) : "Loading...";

      return (

        <React.Fragment>
          <div className="container">
              <div className="row">
                <div className="col-6">
                    <h4 className="mt-5 text-center">Your posts:</h4>
                </div>
                <div className="col-6 text-right">
                    <button onClick={reload} type="button" className="btn btn-success mt-5">
                        Reload table
                    </button>
                </div>
              </div>  
              <hr></hr>

            <div className="row">
                <div className="col-12">
                    {displayPosts}
                </div>
            </div>
          </div>
        </React.Fragment>
      )
    
  }


