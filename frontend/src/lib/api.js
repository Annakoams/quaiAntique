// définition de l'URL du serveur 
const url_server = 'http://localhost:8081/'

// fonction asynchrone pour envoyer une requête POST à l'API
async function postData(params, data) {
    const response = await fetch(url_server + 'api/' + params, 
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
            },
        body:JSON.stringify(data)
    }
    );
    const result = await response.json();
    console.log(result);
    return result;
}

// exportation de la fonction postData pour qu'elle soit disponible dans d'autres fichiers
exports.postData = postData;

// fonction asynchrone pour envoyer une requête PUT à l'API
async function putData(params, data) {
    const response = await fetch(url_server + 'api/' + params, 
    {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
            },
        body:JSON.stringify(data)
    }
    );
    const result = await response.json();
    console.log(result);
    return result;
}

// exportation de la fonction putData pour qu'elle soit disponible dans d'autres fichiers
exports.putData = putData;

// fonction asynchrone pour envoyer une requête POST à l'API avec des données de formulaire
async function postFormData(params, formData) {
    const response = await fetch(url_server + 'api/' + params, 
    {
        method:'POST',
        headers:{
      //   'Content-Type':'multipart/form-data'
            },
        body:formData
    }
    );
    const result = await response.json();
    console.log(result);
    return result;
}

// exportation de la fonction postFormData pour qu'elle soit disponible dans d'autres fichiers
exports.postFormData = postFormData;

// fonction asynchrone pour envoyer une requête GET à l'API
async function getData(params) {
    const response = await fetch(url_server + 'api/' + params);
    const result = await response.json();
    console.log(result);
    return result;
}

// exportation de la fonction getData pour qu'elle soit disponible dans d'autres fichiers
exports.getData = getData;

// exportation de l'URL du serveur pour qu'elle soit disponible dans d'autres fichiers
exports.url_server = url_server;