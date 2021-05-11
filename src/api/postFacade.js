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

function getPostsByUser(username) {
    let options = makeOptions("GET", false);
    //console.log("Token: " + getToken())
    options.headers["x-access-token"] = getToken();
    return fetch(postURL + username + "/all", options) //Returns promise
        .then(handleHttpErrors);
}

function addPost(newPost) {
    let options = makeOptions("POST", false, newPost);
    //console.log("Token: " + getToken())
    options.headers["x-access-token"] = getToken();
    return fetch(postURL, options) //Returns promise
        .then(handleHttpErrors);
}

function deletePost(id) {
    let options = makeOptions("DELETE", true, id);
    return fetch(postURL + id, options)
        .then(handleHttpErrors);
}

function editPost(id, newPost) {
    let options = makeOptions("PUT", true, newPost);
    // console.log(options);
    return fetch(postURL + id, options)
        .then(handleHttpErrors);
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
    addPost,
    deletePost,
    editPost
}

}

const facade = postFacade();
export default facade;
