import 'bootstrap/dist/css/bootstrap.min.css'
import { postURL as URL } from "../utils/settings.js"



//for at poste, skal man være logget ind
const getToken = () => {
    return localStorage.getItem('jwtToken')
}

//log ind
const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
}

//metode ikke i backend endnu
function fetchPosts () {
    return fetch(URL + "allPosts")
    .then(handleHttpErrors)
    .catch((err) => {
        console.log(err)
        if (err.status) {
            err.fullError.then((event) => 
            console.log(event.message));
        } else {
            console.log("Network error");
        }})
    }

function addPost(text, title, username) {
    const options = makeOptions("POST", true, {
        text,
        title,
        username,
    })

    return fetch(URL + "addpost", options)
    .then(handleHttpErrors)
    .catch((err) => {
        console.log(err)
        if (err.status) {
            err.fullError.then((event) => 
            console.log(event.message));
        } else {
            console.log("Network error");
        }})
    }


const postFacade = {
    fetchPosts,
    addPost,
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
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




export default postFacade;
