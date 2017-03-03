let express = require('express')
let bodyParser = require('body-parser')
let {ObjectID} = require('mongodb')

let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo')
let {User} = require('./models/user')

let app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})

// TODO: GET /todos/12345
app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  // Validate id using isValid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    console.log('Id is not valid, send 404')
    return res.status(404).send()
  }

  // findById
  Todo.findById(id).then((todo) => {
    // success
    if (todo) {
      // if todo - send it back
      console.log('Todo found', JSON.stringify(todo, undefined, 2))
      res.send({todo})
    } else {
      // if no todo - send back 404 with empty body
      console.log('Todo not found')
      res.status(404).send()
    }
  }).catch((err) => {
    // error
      // 400 - and send empty body back
    console.log('Promise.catch error', err)
    res.send(400).send(err)
  })
})

app.listen(3000, () => {
  console.log('Started on port 3000')
})

module.exports = {app}
