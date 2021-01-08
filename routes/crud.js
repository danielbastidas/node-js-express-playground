const express = require('express');
const router = express.Router();
const personsSchema = require('../models/data.js')

/** Shows how to save info into the database */
router.get('/save', (req, res, next) => {

    const person = new personsSchema({
        name: req.query.name,
        lastName: req.query.lastName,
        age: req.query.age
    })

    /** both ways are valid to create a record in the database. Using save 
     * Look this way requires to create an object from the model to save the instace
    */
    person.save(function (err, person) {
        if (err) return console.error(err);
        res.json({
            confirmation: "The information was persisted sucessfully into the database",
            data: person
        })
    });

    /** both ways are valid to create a record in the database. Using create
     * Look this does not require an object from the model, it works as a static 
     * invocation to the mongoose object
     */
    // personsSchema.create(person)
    //     .then(person => {
    //         res.json({
    //             confirmation: "success",
    //             data: person
    //         })
    //     })
    //     .catch(err => {
    //         res.json({
    //             confirmation: "fail",
    //             message: err.message
    //         })
    //     })

})

/** Shows how to read info from the database */
router.get('/find', (req, res, next) => {
    personsSchema.find()
        .then(persons => {
            res.json({
                confirmation: "The information was retrieved sucessfully from the database",
                data: persons
            })
        })
        .catch(err => {
            res.json({
                confirmation: "The information could not be retrieved from the database",
                message: err.message
            })
        })
})

/** This end point shows how to perform query operations on the database */
router.get('/filters', (req, res, next) => {

    let filter = req.query

    if (req.query.age != null && req.query.lastName != null) {
        filter = {
            $and: [{
                age: { $gt: req.query.age },
                lastName: { $eq: req.query.lastName }
            }]
        }
    } else if (req.query.age != null) {
        filter = {
            age: { $gt: req.query.age }
        }
    } else if (req.query.lastName != null) {
        filter = {
            lastName: { $eq: req.query.lastName }
        }
    }

    personsSchema.find(filter)
        .then(persons => {
            res.json({
                confirmation: "The information was retrieved sucessfully from the database",
                data: persons
            })
        })
        .catch(err => {
            res.json({
                confirmation: "The information could not be retrieved from the database",
                message: err.message
            })
        })

})

router.get('/update', (req, res) => {
    const query = req.query
    const id = query.id
    delete query['id']

    personsSchema.findByIdAndUpdate(id, query, { new: true })
        .then(person => {
            res.json({
                confirmation: "Record successfully updated",
                data: person
            })
        })
        .catch(err => {
            res.json({
                confirmation: "There was an error updating the information",
                message: err.message
            })
        })

})

/** Be aware that the routes order matters. You should put first the most generic
 * route first and the most specific at the end because other way you most generic routes
 * could be overriden (not considered or recognized) by the most specific ones 
 */
router.get('/findById/:id', (req, res) => {
    let id = req.params.id
    personsSchema.findById(id)
        .then(person => {
            res.json({
                confirmation: "The information was retrieved sucessfully from the database",
                data: person
            })
        })
        .catch(err => {
            res.json({
                confirmation: "The information could not be retrieved from the database",
                message: 'No registry found with ID:' + id
            })
        })

})

/** This endpoint shows how to delete data from the database */
router.get('/remove/:id', (req, res) => {
    personsSchema.findByIdAndRemove(req.params.id)
        .then(data => {
            res.json({
                confirmation: "The information was deleted sucessfully from the database",
                data: 'Person with Id: ' + req.params.id + ' was deleted successfully'
            })
        })
        .catch(err => {
            res.json({
                confirmation: "The information could not be deleted on the database",
                message: 'No registry found with ID:' + id
            })
        })
})

module.exports = router