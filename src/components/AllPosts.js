import React, { useState, useEffect } from "react"
import facade from "../api/postFacade"
import "bootstrap/dist/css/bootstrap.min.css";


function AllPosts() {

    const [posts, setPosts] = useState([])



    useEffect(() => {
        facade.getAllPosts()
          .then((data) => {
            setPosts(data);
          });
          console.log(posts);
      }, [])
      
    try {
      return (

        <React.Fragment>
          <div className="container">
              <div className="row">
                <h3 className="mt-5 text-center">CoffeeRoom Posts</h3>
              </div>
              <hr></hr>
              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Posted by username:</th>
                      <th scope="col">Post title:</th>
                      <th scope="col">Post text:</th>
                      <th scope="col">Post created:</th>
                    </tr>
                  </thead>

                  <tbody>
                      {posts.map(p =>
                        <tr key={p.username}>
                          <td>{p.username}</td>
                          <td>{p.title}</td>
                          <td>{p.text}</td>
                          <td>{p.dateCreated}</td>
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

export default AllPosts;