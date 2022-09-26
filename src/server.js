const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/getUsers': jsonHandler.getUsers,
    '/notReal': jsonHandler.notReal,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/getUsers': jsonHandler.getUsersMeta,
    '/notReal': jsonHandler.notRealMeta,
    notFound: jsonHandler.notFoundMeta,
  },
  POST: {
    '/addUser': jsonHandler.addUser,
  },
};

const parseBody = (request, response, callback) => {
  const body = [];

  request.on('error', (error) => {
    console.dir(error);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyObj = query.parse(bodyString);
    callback(request, response, bodyObj);
  });
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // If user goes directly to URL, attempt a GET request
  if (!urlStruct[request.method]) {
    if (urlStruct.GET[parsedUrl]) {
      urlStruct.GET[parsedUrl](request, response);
    } else {
      // If they go directly to a URL but it's not one handled by GET, then 404
      urlStruct.GET.notFound(request, response);
    }
  }

  // An accepted request method is given

  // If the method is POST, parse the body before giving it to the json handler
  if (request.method === 'POST' && urlStruct.POST[parsedUrl.pathname]) {
    parseBody(request, response, urlStruct.POST[parsedUrl.pathname]);
  } else if (urlStruct[request.method][parsedUrl.pathname]) {
    // If it's any other accepted method, handle it normally
    urlStruct[request.method][parsedUrl.pathname](request, response);
  } else {
    // Unaccepted method
    urlStruct.GET.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
