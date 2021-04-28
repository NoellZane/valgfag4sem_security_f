import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import pFacade from "../api/postFacade"

//BARE ROLIG POST DELEN, SKAL IKKE VÆRE HER
//MEN JEG KAN IKKE FÅ LOV TIL AT KIGGE PÅ POST SIDEN
//SÅ FOR AT KUNNE SE HVAD JEG LAVEDE, BLEV JEG NØDT TIL AT BRUGE EDIT SIDEN 
//HEHE
//HILSEN SELINA

export default function Edit() {
    const [post, setPost] = useState([]);
    const [addPost, setAddPost] = useState({ 'postId': 0, 'text': ''})
    const [message, setMessage] = useState("");
    let {postId} = useParams();

    
    useEffect(() => {
        pFacade.getPostById(postId)
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
      setAddPost({ ...addPost, [event.target.name]: event.target.value })
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
      <div className="addPost">
        <form handleChange={handleChange}>
          <text row="10" col="10" placeholder="content" id="text" />
          <button onClick={handleSubmit}>Add post</button>
          </form></div>

    )
}
  