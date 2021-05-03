import 'bootstrap/dist/css/bootstrap.min.css'
import { postURL } from "../utils/settings.js"

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
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


function postFacade () {

const getAllPosts = () => {
    let options = makeOptions("GET", true);
    return fetch(postURL + "all", options)
    .then(handleHttpErrors)
}

const getPostsByUser = (username) => {
    let options = makeOptions("GET", true);
    return fetch(postURL + "all" + username, options)
    .then(handleHttpErrors)
}

const addPost = (text, title, username) => {
    let options = makeOptions("POST", true, {
        text,
        title,
        username

    })
    return fetch(postURL + "addpost", options)
    .then(handleHttpErrors)
}


const makeOptions = (method, addToken, body) => {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
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

return {
    makeOptions,
    getAllPosts,
    getPostsByUser,
    addPost
}

}

const facade = postFacade();
export default facade;
