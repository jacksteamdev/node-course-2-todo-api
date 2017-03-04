const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
//   console.log(result)
// })

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({_id: "58baf2370acf5891b8552e95"}).then((todo) => {
//   console.log(todo)
// })

Todo.findByIdAndRemove('58baf2370acf5891b8552e95').then((todo) => {
  console.log(todo)
})
