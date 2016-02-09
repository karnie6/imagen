#Welcome
This is the Imagen photo uploader and annotator.  It uses Facebook as an authenticator/login interface, Mongo as the DB, S3 / CloudFront as the ImageStore, React/Reflux for the front-end, Node.JS for the backend, and Annotorious as the 3rd party JS library to help with annotations.

#Setting up
To run by checking out, follow these steps:
* Once checked out, run `npm init`
* To develop, I've used Watchify to auto-compile my react code into something the browser can understand.  To do this, run `npm run compile-react` in a separate terminal tab so it's always running
* To start the node.js server, simply run `npm start`

#Open Issues
* Occasionally, Annotorious isn't able to correctly size the canvas for image annotations, not allowing the user to create or load previous annotations.  I believe this is an issue around Annotorious not responding correctly to resize events, but more investigation is needed
* Locally, Facebook redirection post login fails.  The user has to manually go to http://localhost:3000/images after logging in.
