const url_server = 'http://localhost:8081/'


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
exports.postData = postData;

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
exports.putData = putData;

async function getData(params) {
    const response = await fetch(url_server + 'api/' + params);
    const result = await response.json();
    console.log(result);
    return result;
}
exports.getData = getData;
exports.url_server = url_server;