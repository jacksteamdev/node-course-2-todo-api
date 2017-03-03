let mongoose = require('mongoose')

mongoose.Promise = global.Promise

console.log(JSON.stringify(process.env, undefined, 2))

const dbUri = {
  mlabUri: 'mongodb://todoApi:&C2*cW42y22X@ds011890.mlab.com:11890/teamsteam-node-todo-api',
  localUri: 'mongodb://localhost:27017/TodoApp'
}
mongoose.connect( process.env.PORT ? dbUri.mlab : dbUri.localhost)

module.exports = {
  mongoose
}
