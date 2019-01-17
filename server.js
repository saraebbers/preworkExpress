const express = require('express');
// this requires the Express module that was installed with NPM
const app = express();
// this sets up our Express application, with the app I can configure and add functionality to my server
const data = require('./public/data.json');

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
}

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next()
}

app.use(urlLogger, timeLogger);

app.use(express.static('public'))
// app.use configures the application to use a middleware function.  basically for every request to the server, always run the function passed into app.use.  The express.static(public) part defines the path to our static assets.  it defines that directory to where the static files are stored.  

const middlewareFuncName = (request, response, next) => {
  next();
};
//MIDDLEWARE: express middleware are functions that run after a request is received but before the route handler function.  They have access to the request obj, response obj, and function called next to pass control to the next middleware fn or route handler.  Middle ware should be used for authentications or authorization

app.get('/', (request, response) => {
})

app.get('/json', (request, response) => {
  response.status(200).json(data)
});

app.get('/sunsets', (request, response) => {
  const options = {
    root: 'public'
  }
  response.sendFile('sunsets.html', options)
})
// this is the route handler, app.get creates a route handler specifically listening for GET requests.  The first arguement is the route path.  (between the first and second arguments you can add MIDDLEWARE!) The second argument is a callback that take a request object and a response object.  the request object contains info about the request (such as headers, query parameters and body) the response object contains info that my server will send as a response back to the client.  it also has functions that enables my server to send back a response.  The response.sendfunction sends a response with content in the body of the response.  

app.listen(3000, () => {
  console.log('Express intro running on localhost: 3000');
});
// app.listen() tell the server to listen for connections on the specified port-- we see the console log in the terminal

app.use((request, response, next) => {
  response.status(404).send("Sorry can't find that!  This is the 404 Error I'm sending out")
});
//Remember that the 404 error should be the very last function!
