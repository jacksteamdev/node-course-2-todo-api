let mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/TodoApp')

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

// let newTodo = new Todo({
//   text: 'Something to do'
// })
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc)
// }, (err) => {
//   console.log('Unable to save todo', err)
// })

// User
// email - require - trim - set type - set minlength of 1
let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

let newUser = new User({
  email: 'email@email.com          '
})

newUser.save().then((doc) => {
  console.log('Saved user', doc)
}, (err) => {
  console.log('Unable to save user', err)
})
