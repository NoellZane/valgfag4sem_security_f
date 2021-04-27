import 'bootstrap/dist/css/bootstrap.min.css'
import { postURL as URL } from "./settings.js"
import apiFacade from "./apiFacade"

function postsFacade () {

    const getPostById = (id) => {
        return fetch(URL + `${id}`, apiFacade.makeOptions("GET", true))
        .then(handleHttpErrors);
    }

    return { getPostById };
}

/*det var meningen, at jeg ville importere handleHttpErrors,
øverst oppe: import apiFacade, { handleHttpErrors } from blabla.
Men det kunne jeg ikke få lov til fordi den ikke exporteres fra
apiFacaden. Jeg ville ikke ændre noget, så derfor satte jeg den 
bare ind her i postsFacade. Det klart for at undgå gentagelser,
så kunne det være fedest at bare importere den fra apiFacade.
*/

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

const pFacade = postsFacade();
export default pFacade;
