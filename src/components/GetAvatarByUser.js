import React, { useState, useEffect } from "react"
import facade from "../api/avatarFacade"
import afacade from "../api/apiFacade"
import "bootstrap/dist/css/bootstrap.min.css";
import jwtdecode from "jwt-decode"
import '../App.css';
import { render } from "@testing-library/react";

export default function GetAvatarByUser({ loggedIn }) {

    const emptyAvatar = {
        image: "",
    }

    const [avatarImage, setAvatarImage] = useState("");
    const [render, setRender] = useState(false);
    const [usernameButton, setUsernameButton] = useState(false);
    //const [newAvatar, setNewAvatar] = useState({ ...emptyAvatar });
    const [imageDiv, setImageDiv] = useState("");
    const [image, setImage] = useState("");

    function fetchAvatar(username) {
        facade.getAvatarByUser(username)
            .then((data) => {

                //     // Converting Blob data to Base64 and setting it to avatar const
                //     var newData = JSON.stringify(data);
                //     var obj = JSON.parse(newData);
                //     var reader = new FileReader();
                //     console.log(obj.avatarImage);
                //     reader.readAsDataURL(obj.avatarImage);
                //     reader.onloadend = function() {
                //         var base64data = reader.result
                //         setAvatar(base64data);
                //     }
                console.log("DATA TYPE: " + typeof (data.avatarImage));
                setAvatarImage(data.avatarImage);
            });
        console.log("Username: " + username);
        setUsernameButton(username);
    }

    function reload(evt) {
        evt.preventDefault();
        fetchAvatar(usernameButton);
    }

    useEffect(() => {
        if (loggedIn) {
            const token = afacade.getToken();
            const decodedToken = jwtdecode(token);
            fetchAvatar(decodedToken.username);
        };
    }, [loggedIn])

    return (

        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-6 text-right">
                        <button onClick={reload} type="button" className="btn btn-success mt-5">
                            Reload avatar
                    </button>
                    </div>
                </div>
                <hr></hr>

                <div className="row">
                    <div className="col-12">
                        <img src={avatarImage} alt="PB" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}