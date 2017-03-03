let mongoose = require('mongoose')

mongoose.Promise = global.Promise

const dbUri = {
  mLab: 'mongodb://todoApi:7kPYx2H16O0A@ds011890.mlab.com:11890/teamsteam-node-todo-api',
  local: 'mongodb://localhost:27017/TodoApp'
}

// TODO: fix this logic later in the course
const path = process.env.PATH
const onHeroku = (path) => /heroku/.test(path)

process.env.MONGODB_URI = onHeroku(path) ? dbUri.mLab : dbUri.local

mongoose.connect(process.env.MONGODB_URI)

module.exports = {mongoose}
