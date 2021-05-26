import afacade from "../api/apiFacade"
import avaFacade from "../api/avatarFacade"
import React, { useState, useEffect } from "react";
import jwtdecode from "jwt-decode";

export default function UploadAvatar({ loggedIn }) {
    const emptyAvatar = {
        image: "",
        username: ""
    }

    const [newAvatar, setNewAvatar] = useState({ ...emptyAvatar });
    const [username, setUsername] = useState("");


    const handleChange = (evt) => {
        encodeImageFileAsURL();
        console.log(evt.target)
        setNewAvatar({...newAvatar})
        
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        setNewAvatar({ ...emptyAvatar })
        newAvatar.image = encodeImageFileAsURL();
        newAvatar.username = username;
        // console.log(encodeImageFileAsURL());
        avaFacade.uploadAvatar(newAvatar)
    }

    function encodeImageFileAsURL() {
        let medBlobSize = 16777215;
        var srcData = "";

        var filesSelected = document.getElementById("inputFileToLoad").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];

            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) {
                srcData = fileLoadedEvent.target.result; // Image is now stored in base64 string

                console.log("Converted Base64 version of avatar is: " + srcData);
            }
            fileReader.readAsDataURL(fileToLoad);
        }
        return srcData;
    }

    /*--------------------------------------------------------------*/

    useEffect(() => {
        if (loggedIn) {
            const token = afacade.getToken();
            const decodedToken = jwtdecode(token);

            setUsername(decodedToken.username);
        }
    }, [loggedIn])

    /*--------------------------------------------------------------*/

    return (
        <div className="container">
            <div className="row">
                <div className="col-5 text-center">
                    <h4 className="mt-5">Upload a new avatar</h4>
                    <hr></hr>

                    <form className="uploadAvatar-form" onSubmit={handleSubmit}>

                        <input
                            onChange={handleChange}
                            type="file"
                            value={newAvatar.image}
                            id="inputFileToLoad" />

                        <button className="form-field" type="submit">Upload Avatar</button>

                    </form>
                </div>
            </div>
        </div>
    )

}