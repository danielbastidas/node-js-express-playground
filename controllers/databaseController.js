const personsSchema = require('../models/data.js')

const save = (req, res, next) => {

    const person = new personsSchema({
        name: req.query.name,
        lastName: req.query.lastName,
        age: req.query.age
    })

    /** both ways are valid to create a record in the database. Using save 
     * Look this way requires to create an object from the model to save the instace
    */
    person.save(function (err, person) {
        if (err) {
            console.error(err);
            res.status(400).json({
                confirmation: "There was an error persisting the information in the database",
                data: err.message
            })
        } else {
            res.status(200).json({
                confirmation: "The information was persisted sucessfully into the database",
                data: person
            })
        }

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

}

const findAll = (req, res, next) => {
    /** Excluding the version attribute */
    personsSchema.find().select("_id name lastName")
        .then(persons => {
            res.status(200).json({
                confirmation: "The information was retrieved sucessfully from the database",
                data: persons
            })
        })
        .catch(err => {
            res.status(400).json({
                confirmation: "The information could not be retrieved from the database",
                message: err.message
            })
        })
}

const filters = (req, res, next) => {

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
            res.status(200).json({
                confirmation: "The information was retrieved sucessfully from the database",
                data: persons
            })
        })
        .catch(err => {
            res.status(400).json({
                confirmation: "The information could not be retrieved from the database",
                message: err.message
            })
        })

}

const update = (req, res) => {
    const query = req.query
    const id = query.id
    delete query['id']

    personsSchema.findByIdAndUpdate(id, query, { new: true })
        .then(person => {
            res.status(200).json({
                confirmation: "Record successfully updated",
                data: person
            })
        })
        .catch(err => {
            res.status(400).json({
                confirmation: "There was an error updating the information",
                message: err.message
            })
        })

}

const findById = (req, res) => {
    let id = req.params.id
    personsSchema.findById(id)
        .then(person => {
            res.status(200).json({
                confirmation: "The information was retrieved sucessfully from the database",
                data: person
            })
        })
        .catch(err => {
            res.status(400).json({
                confirmation: "The information could not be retrieved from the database",
                message: 'No registry found with ID:' + id
            })
        })

}

const deleteById = (req, res) => {
    personsSchema.findByIdAndRemove(req.params.id)
        .then(data => {
            res.status(200).json({
                confirmation: "The information was deleted sucessfully from the database",
                data: 'Person with Id: ' + req.params.id + ' was deleted successfully'
            })
        })
        .catch(err => {
            res.status(400).json({
                confirmation: "The information could not be deleted on the database",
                message: 'No registry found with ID:' + id
            })
        })
}

module.exports = {
    save,
    findAll,
    filters,
    update,
    findById,
    deleteById
}