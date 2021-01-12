const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController')
const dataValidator = require('../validators/dataValidator')

/** Shows how to save info into the database after validating the data */
router.get('/save', dataValidator.persistValidation, databaseController.save)

/** Shows how to read info from the database */
router.get('/find', databaseController.findAll)

/** This end point shows how to perform query operations on the database */
router.get('/filters', databaseController.filters)

router.get('/update', databaseController.update)

/** Be aware that the routes order matters. You should put first the most generic
 * route first and the most specific at the end because other way you most generic routes
 * could be overriden (not considered or recognized) by the most specific ones 
 */
router.get('/findById/:id', databaseController.findById)

/** This endpoint shows how to delete data from the database */
router.get('/remove/:id', databaseController.deleteById)

module.exports = router