const express = require('express');
const path = require('path');
const morganMiddleware = require('morgan')
var hoganMiddleware = require('hogan-middleware');
const dotEnv = require('dotenv')
const expressValidator = require('express-validator')
/* The routes supported by the server are contained in the 
index.js file inside the routes folder */
const router = require('./routes/index.js');
const databaseRoutes = require('./routes/crud.js');
const customRoutes = require('./routes/custom')

// object desctructuring is like a static method invocation
const { connectDatabase } = require('./database/db.js');

/** configuring environment variables */
dotEnv.config()

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
 * This is an example of a custom middleware developed by yourself
 */
app.use((req, res, next) => {
    const timestamp = new Date()
    var data = {
        timestamp: timestamp.toString(),
    }
    req.data = data
    next()
})

/** Example of how to use a third party middleware */
app.use(morganMiddleware("dev"))

/** this middleware is only used by the customRoutes */
const customMiddleware = (req, res, next) => {
    console.log('performing custom middleware actions')
    next()
}

connectDatabase()

/** Configuring the request validator. See datavalidator.js for more information */
app.use(expressValidator())
app.use('/', router);
app.use('/database', databaseRoutes);
/** Look this route has a custom middleware implemented */
app.use('/custom', customMiddleware, customRoutes)

const port = process.env.PORT || 8080
app.listen(port);
console.log(`Server running on http://localhost:${port}`);

//TODO: use express validator