// followed https://medium.com/javascript-in-plain-english/secure-react-express-apps-jsonwebtoken-cookie-session-auth0-and-passport-tutorial-e58d6dce6c91
// to implement auth/passport/jwt stuff
const express = require("express"); 
const proxy = require('http-proxy-middleware').createProxyMiddleware;


/* Create Express App */
const app = express();

app.use(proxy("/api/wmts/getCapabilities", { target: "http://basemap.arctic-sdi.org/mapcache/wmts/?request=GetCapabilities&service=wmts" }))


app.listen(8080, function () {
    console.log("Server listening on port 8080");
  });
  