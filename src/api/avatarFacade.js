import 'bootstrap/dist/css/bootstrap.min.css'
import { avatarURL } from "../utils/settings.js"

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

// Used as an extra measure to view full error messages in console
function handleErrors(res) {
    if (!res.ok) {
        throw Error(res.statusText);
    }
    return res;
}

/*--------------------------------------------------------------*/

const getToken = () => {
    return localStorage.getItem('jwtToken')
}

/*--------------------------------------------------------------*/

const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}

/*--------------------------------------------------------------*/


function avatarFacade() {

    const makeOptions = (method, addToken, body) => {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json", //Maybe change this if an error occurs
                'Accept': 'application/json',
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    const fetchAsBlob = url => fetch(url)
        .then(response => response.blob());

    const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onloadend = () => {
            // use a regex to remove data url part
            const base64String = reader.result
              .replace("data:", "")
              .replace(/^.+,/, "");
      
            // log to console
            // logs wL2dvYWwgbW9yZ...
            console.log(base64String);
          };
        reader.readAsDataURL(blob);
    });

    function getAvatarByUser(username) {
        let options = makeOptions("GET", false);
        options.headers["x-access-token"] = getToken();
        console.log("username: " + username);
        // let avatar = fetch(avatarURL + username, options)
        //     .then(response => response.blob())
        let avatar = fetch(avatarURL + username, options)
        .then(console.log);
        if (!avatar || avatar == null) {
            avatar.src = 'https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg';
        }
        return avatar;
    }

    function uploadAvatar(avatar) {
        //console.log(avatar.username)
        //console.log(avatar.image)
        //console.log(typeof(avatar.image))
        let options = makeOptions("POST", false, avatar);
        options.headers["x-access-token"] = getToken();
        return fetch(avatarURL + "upload", options)
            .then(handleHttpErrors)
            // Lines below may possibly be deleted before handin
            .then(handleErrors)
            .then(function (res) {
                console.log("ok");
            }).catch(function (error) {
                console.log(error);
            });
    }

    return {
        makeOptions,
        getAvatarByUser,
        uploadAvatar
    }
}

const facade = avatarFacade();
export default facade;