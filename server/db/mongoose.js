let mongoose = require('mongoose')

mongoose.Promise = global.Promise

let path = process.env.PATH
console.log('process.env.PATH contains "heroku"', /heroku/.test(path))

const dbUri = {
  mlabUri: 'mongodb://todoApi:7kPYx2H16O0A@ds011890.mlab.com:11890/teamsteam-node-todo-api',
  localUri: 'mongodb://localhost:27017/TodoApp'
}
mongoose.connect( process.env.PORT ? dbUri.mlab : dbUri.localhost)

module.exports = {
  mongoose
}
