const url_server = 'http://localhost:8081/'



async function getData(params) {
    const response = await fetch(url_server + 'api/' + params);
    const result = await response.json();
    console.log(result);
    return result;
}
exports.getData = getData;
exports.url_server = url_server;