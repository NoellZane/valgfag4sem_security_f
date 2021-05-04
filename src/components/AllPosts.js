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
      }, [])
      
    try {
      return (

        <React.Fragment>
          <div className="container">
              <row>
                <h3 className="mt-5 text-center">CoffeeRoom Posts</h3>
              </row>
              <hr></hr>
              <row>
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
              </row>
          </div>
        </React.Fragment>
      )
    } catch {
      console.log("No posts error.")
      return (
        <div className="container">
            <row>
              <h3 className="mt-5 text-center">CoffeeRoom Posts</h3>
            </row>
            <row>
              <h5>There are no posts yet.</h5>
            </row>
        </div>
      )
    }
}

export default AllPosts;