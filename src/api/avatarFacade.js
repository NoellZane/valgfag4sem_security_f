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
    if(!res.ok) {
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

    function getAvatarByUser(username) {
        let options = makeOptions("GET", false);
        options.headers["x-access-token"] = getToken();
        console.log("username: " + username);
        let avatar = fetch(avatarURL + username, options)
        console.log(avatar);
        if (!avatar || avatar == null) {
            avatar.src = 'https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg';
        }
        return avatar
            .then(handleHttpErrors);
    }

    function uploadAvatar(avatar) {
        //console.log(avatar.username)
        //console.log(avatar.image)
        //console.log(typeof(avatar.image))
        let options = makeOptions("POST", false, avatar);
        options.headers["x-access-token"] = getToken();
        return fetch(avatarURL + "upload", options)
            .then(handleHttpErrors)
            // Lines 76-81 may possibly be deleted before handin
            .then(handleErrors)
            .then(function(res) {
                console.log("ok");
            }).catch(function(error) {
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