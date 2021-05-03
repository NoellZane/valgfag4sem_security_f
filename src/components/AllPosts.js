import React, { useState, useEffect } from "react"
import facade from "../api/postFacade"



function AllPosts() {

    const [posts, setPosts] = useState([])



    useEffect(() => {
        facade.getAllPosts()
          .then((data) => {
            setPosts(data);
          });
      }, [])
      

    return (

      <React.Fragment>
        <div className="container">
            <h3 className="mt-5 text-center">CoffeeRoom Posts</h3></div>
            <hr></hr>

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
      </React.Fragment>
    )
}

export default AllPosts;
  