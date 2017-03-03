let mongoose = require('mongoose')

mongoose.Promise = global.Promise

const path = process.env.PATH
const onHeroku = (path) => /heroku/.test(path)
console.log('process.env.PATH contains "heroku"', onHeroku(path))

const dbUri = {
  mLab: 'mongodb://todoApi:7kPYx2H16O0A@ds011890.mlab.com:11890/teamsteam-node-todo-api',
  local: 'mongodb://localhost:27017/TodoApp'
}
mongoose.connect(onHeroku(path) ? dbUri.mLab : dbUri.local)

module.exports = {
  mongoose
}
