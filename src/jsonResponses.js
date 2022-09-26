const users = {};

const respondJSON = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const notReal = (request, response) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page you are looking for could not be found',
  };
  respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

const notFound = (request, response) => {
  const responseJSON = {
    id: 'notFound',
    message: 'The page you are looking for could not be found',
  };
  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };
  let status = 204;

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    responseJSON.message = 'Missing name and/or age';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (!users[body.name]) {
    status = 201;
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (status === 201) {
    responseJSON.message = 'Created successfully';
    return respondJSON(request, response, status, responseJSON);
  }
  return respondJSONMeta(request, response, status);
};

module.exports = {
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  notFound,
  notFoundMeta,
  addUser,
};
