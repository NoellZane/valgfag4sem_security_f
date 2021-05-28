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
    const [filename, setFilename] = useState("");
    const [srcData, setSrcData] = useState("");
    const [username, setUsername] = useState("");


    const handleChange = (evt) => {
        console.log("VALUE: " + evt.target.files[0].name)
        encodeImageFileAsURL();
        setFilename(evt.target.files[0].name)
        //console.log(evt.target)
        setNewAvatar({...newAvatar})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log("srcData: " + srcData);
        setNewAvatar({ ...{srcData, username} })
        newAvatar.image = srcData;
        //console.log(newAvatar.image)
        newAvatar.username = username;
        avaFacade.uploadAvatar(newAvatar)
    }

    function encodeImageFileAsURL() {
        let medBlobSize = 16777215;

        var filesSelected = document.getElementById("inputFileToLoad").files;
        console.log("type filesSelected: " + typeof(filesSelected))
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            
            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) {
                setSrcData(fileLoadedEvent.target.result)
                // srcData = fileLoadedEvent.target.result; // Image is now stored in base64 string

                //console.log("Converted Base64 version of avatar is: " + srcData);
            }
            fileReader.readAsDataURL(fileToLoad);
        } 
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
                            //value={filename}
                            id="inputFileToLoad" />

                        <button className="form-field" type="submit">Upload Avatar</button>

                    </form>
                </div>
            </div>
        </div>
    )

}