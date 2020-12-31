const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')

// const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res, next) => {
    res.send('Hello world using router');
});

router.get('/home', (req, res, next) => {
    res.render('home.mustache', req.data);
});

router.get('/json', (req, res, next) => {
    const data = {
        text: 'Hello World from express'
    };
    res.json(data);
});

/* This route will show how to extract parameters from the url path.
Also called request parameters */
router.get('/:param1/:param2', (req, res, next) => {
    const param1 = req.params.param1
    const param2 = req.params.param2
    const data = {
        parameter1: param1,
        parameter2: param2
    };
    res.json(data);
});

/* This route will show how to extract query parameters from the url */
router.get('/url-query-params', (req, res, next) => {
    const param1 = req.query.param1
    const param2 = req.query.param2
    const data = {
        parameter1: param1,
        parameter2: param2
    }
    res.json(data)
});

/* This route shows how to display data dynamically on the front end */
router.get('/dynamic_data', (req, res, next) => {
    const name = req.query.name
    const occupation = req.query.occupation
    const data = {
        name: name,
        occupation: occupation
    }
    res.render('dynamic-data.mustache', data)
});

/* This handler shows how to receive data from a post request */
router.post('/post', urlencodedParser, (req, res, next) => {
    const data = req.body
    console.log('Received data is:' + JSON.stringify(data))
    const response = {
        data: data
    }
    res.json(response)
});

/** Shows how to redirect to another url */
router.get('/redirect', (req, res, next) => {
    res.redirect('/json')
})

module.exports = router;