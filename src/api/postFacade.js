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

function addPost(newPost) {
    let options = makeOptions("POST", false, newPost);
    //console.log("Token: " + getToken())
    options.headers["x-access-token"] = getToken();
    return fetch(postURL, options) //Returns promise
        .then(handleHttpErrors);
}
/*
const addPost = (text, title, username) => {
    let options = makeOptions("POST", true, {
        title,
        text,
        username

    })
    console.log(options);
    console.log(options.username);
    return fetch(postURL, options)
    .then(handleHttpErrors)
}

*/
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
