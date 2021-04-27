import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import pFacade from "../postsFacade"

export default function Posts() {
    const [post, setPost] = useState([]);
    const [message, setMessage] = useState(null);
    let {postId} = useParams();

    
    useEffect(() => {
        pFacade.getPostsById(postId)
          .then(data => setPost([...data]))
          .catch((err) => {
            if (err.status) {
            err.fullError.then((e) => {
            console.log(e.message);
            setMessage(e.message);
            });
          } else {
            console.log("Error occurred!");
            setMessage("Error occurred!");
            }

          });
      }, [])
      

    return (
    
  <table className="table" style={{width: "90%"}}>
      <thead>
        <tr>
          <th>Hallloj</th>
          <th></th>
        </tr>
      </thead>

      <tbody>{post.map((posts) => {
        return (
          <tr key={posts.id}>
            <td>{posts.userId}</td>
            <td>{posts.text}</td>
          </tr>
          )})}
      </tbody>

      
  </table>
    
     
    )
}
  