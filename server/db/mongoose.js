let mongoose = require('mongoose')

mongoose.Promise = global.Promise

const dbUri = {
  mlabUri: 'mongodb://todoApi:&C2*cW42y22X@ds011890.mlab.com:11890/teamsteam-node-todo-api',
  localUri: 'mongodb://localhost:27017/TodoApp'
}
mongoose.connect(dbUri.mlab || dbUri.local)

module.exports = {
  mongoose
}
