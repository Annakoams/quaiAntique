// définition de l'URL du serveur 
const url_server = (window.location.port==="3000"? "http://"+ window.location.hostname +":8081/"  :"/" );


const getTokenHeader = ()=>{
    const token  = window.localStorage.getItem("token");

   if(token){
    return {  "Authorization":"Bearer " + token};    
   }
   else 
   {
    return {}
   }
}


// fonction asynchrone pour envoyer une requête POST à l'API
async function postData(params, data) {





    const response = await fetch(url_server + 'api/' + params, 
    {
        method:'POST',
        headers:{
            'Content-Type':'application/json',
              ...getTokenHeader()
            },
        body:JSON.stringify(data)
    }
    );
    const result = await response.json();
    console.log(result);
    return result;
}
// function asynchrone pour envoyer une requette delate a l'api

async function deleteData(params) {
    const response = await fetch(url_server + 'api/' + params, {
      method: 'DELETE',
      headers:{
       
          ...getTokenHeader()
        },
    });
    const result = await response.json();
    console.log(result);
    return result;
  }

// fonction asynchrone pour envoyer une requête PUT à l'API
async function putData(params, data) {
    const response = await fetch(url_server + 'api/' + params, 
    {
        method:'PUT',
        headers:{
            'Content-Type':'application/json',

          ...getTokenHeader()
            },
        body:JSON.stringify(data)
    }
    );
    const result = await response.json();
    console.log(result);
    return result;
}

// fonction asynchrone pour envoyer une requête POST à l'API avec des données de formulaire
async function postFormData(params, formData) {
    const response = await fetch(url_server + 'api/' + params , 
    {
        method:'POST',
        headers:{
        // 'Content-Type':'multipart/form-data',
        ...getTokenHeader()
            },
        body:formData
    }
    );
    const result = await response.json();
    console.log(result);
    return result;
}

// fonction asynchrone pour envoyer une requête GET à l'API
async function getData(params) {
    const response = await fetch(url_server + 'api/' + params,{

        method: 'GET',
        headers:{
            ...getTokenHeader()
        }
                
    });
    const result = await response.json();
    console.log(result);
    return result;
}


export  {getData,putData,url_server,postData,postFormData, deleteData }