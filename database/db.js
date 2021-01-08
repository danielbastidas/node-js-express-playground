const mongoose = require('mongoose');

const connectDatabase = () => mongoose.connect('mongodb://localhost/persons_db', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error to the database:'))
db.once('open', function () {
    console.log('connected to the database')
})

process.on('SIGINT', function () {
    console.log('closing app!!!!!!!!!!')
    db.close()
    process.exit()
});
process.on('SIGTERM', function () {
    console.log('closing app2!!!!!!!!!!')
    db.close()
    process.exit()
});

module.exports = {
    connectDatabase
}