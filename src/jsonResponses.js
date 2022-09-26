const users = {};

const respondJSON = (request, response, status, content) => {
    response.writeHead(status, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(content));
    response.end();
};

const respondJSONMeta = (request, response, status) => {
    response.writeHead(status, {'Content-Type': 'application/json'});
    response.end();
};

const getUsers = (request, response) => {
    
};

const notReal = (request, response) => {

};

const notFound = (request, response) => {
    respondJSONMeta(request, response, 404);
};

module.exports = {

};
