const express = require('express');
const path = require('path');
var hoganMiddleware = require('hogan-middleware');


const app = express();
// in order to use the template engine you need to install
// hjs and hogan-middleware
// setting the views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.engine('mustache', hoganMiddleware.__express);
// setting the static assets folder
app.use(express.static(path.join(__dirname, 'public')));

/** this is an example of how to configure a middleware or interceptoor to add data
 * on each request
 */
app.use((req, res, next) => {
    const timestamp = new Date()
    var data = {
        timestamp: timestamp.toString(),
    }
    req.data = data
    next()
})

/* The routes supported by the server are contained in the 
index.js file inside the routes folder */
const router = require('./routes/index.js');
app.use('/', router);

app.listen(8080);
console.log('Server running on http://localhost:8080');