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

/** this is an example of how to configure a middleware or interceptor to add data
 * on each request.
 * Because the middleware/interceptor is defined before the definition of the router
 * the middleware will be available for the router. In case this definition happens after
 * the definition of the router, it will not apply to the routes
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
// object desctructuring is like a static method invocation
const databaseRoutes = require('./routes/database.js');
const { connectDatabase } = require('./database/db.js')

connectDatabase()

app.use('/', router);
app.use('/database', databaseRoutes);

app.listen(8080);
console.log('Server running on http://localhost:8080');