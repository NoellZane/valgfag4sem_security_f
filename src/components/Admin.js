import React, { useState,useEffect } from "react"
import facade from "../api/apiFacade";

export default function Admin() {
    const [render, setRender] = useState(false);
    //const [dataFromServer, setDataFromServer] = useState(null);
    const [message, setMessage] = useState(null);
    const [users, setUsers] = useState([]);
    const [tableRows, setTableRows] = useState("");

    // function editUser(evt){
    //     evt.preventDefault();
    //     facade.editUser(evt.target.id)
    //     userToEdit = {username: evt.target.id, password}
    // }
    function deleteUser(evt){
        evt.preventDefault();
        facade.deleteUser(evt.target.id);
        setRender(!render);
        setMessage("User deleted");
        getAllUsers();
        
    }

    function getAllUsers(){
      facade.getAllUsers()
        .then((data) => {
          setUsers(data);
        })
          /*
        facade.getAllUsers()
        .then(data => {
            setTableRows(data.map((user) =>
            (<tr key={user.username}>
              <td>{user.username}</td>    
              <td><button id={user.username} onClick={deleteUser}>Delete</button></td>    
            </tr>)
        )       
                  
              )})
              */
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
    }
    useEffect(() =>{ //Takes care of the stuff that ComponentDidMount used to
        setMessage("");
        getAllUsers();
        // setDataFromServer(null)
        
    },[render]) //What useEffect is listening for changes on


 const displayUsers = setTableRows ? (
    <div className="row">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {users.map(user =>
            <tr key={user.username}>
              <td>{user.username}</td>    
              <td><button id={user.username} onClick={deleteUser}>Delete</button></td>    
            </tr>)}
        </tbody>
      </table>
    </div>
  ) : "Loading...";

 return (    
    <div className="container mt-5">
      <h2>Fetched Data</h2>
      {!message && displayUsers}
      <p>{message}</p>

    </div>
    
  );
 }