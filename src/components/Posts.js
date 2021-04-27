import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import pFacade from "../postsFacade"

export default function Posts() {
    const [post, setPost] = useState([]);
    const [addPost, setAddPost] = useState({ 'postId': 0, 'text': ''})
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
      


    const handleChange = (event) => {
      setAddPost({ ...addPost, [event.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
      event.preventDefault()
      addPost.postId = postId
      pFacade.addPost(addPost)
      .then(data => {
        var refresh = [...post]
        refresh.push(data)
        setPost(refresh)
        setAddPost({ 'postId': 0, 'text': ''})
      })
    }

    return (
      <div className="text">hej</div>
    )
}
  