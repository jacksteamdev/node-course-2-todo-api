const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

let id = '58b8a21309c3e70fa6c10506'

if (!ObjectID.isValid(id)) {
  console.log('ID not valid')
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found')
//   }
//   console.log('Todo by Id', todo)
// }).catch((e) => console.log(e))

// User.findById
User.findById(id).then((user) => {
  if (!user) {
    return console.log('User not found')
  }
  console.log('User by Id', user)
}).catch((err) => console.log(err))
