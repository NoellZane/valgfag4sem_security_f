
import React, { useState, useEffect } from "react"
import facade from "../api/postFacade"
import "bootstrap/dist/css/bootstrap.min.css";

  export default function AllPosts() {

    const [posts, setPosts] = useState([])

    function fetchPosts(){
      facade.getAllPosts()
          .then((data) => {
            setPosts(data.allPosts);
          });
    }

    useEffect(() => {
      fetchPosts();
    }, [])

      
    try {
      return (

        <React.Fragment>
          <div className="container">
              <div className="row">
                <h3 className="mt-5 text-center">CoffeeRoom Posts</h3>
              </div>
              <hr></hr>

                <p>Please refrain from using profanity or leaking other people's personal information.</p>
              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Posted by:</th>
                      <th scope="col">Post title:</th>
                      <th scope="col">Post text:</th>
                      <th scope="col">Post created:</th>
                      <th scope="col">Post edited:</th>
                    </tr>
                  </thead>

                  <tbody>
                      {posts.map(p =>
                        <tr key={p.id}>
                          <td>{p.username}</td>
                          <td>{p.title}</td>
                          <td>{p.text}</td>
                          <td>{p.dateCreated}</td>
                          <td>{p.lastEdited}</td>
                        </tr>)}
                  </tbody>
                </table>
              </div>
          </div>
        </React.Fragment>
      )
    } catch {
      console.log("No posts error.")


      return (
        <div className="container">
            <div className="row">
              <h3 className="mt-5 text-center">CoffeeRoom Posts</h3>
            </div>
            
            <div className="row">
              <h5>There are no posts yet.</h5>
            </div>
        </div>
      )
    }
    

  }


