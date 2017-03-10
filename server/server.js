require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo')
let {User} = require('./models/user')
let {authenticate} = require('./middleware/authenticate')

let app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())

// CREATE new todo
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send()
  })
})

// READ all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (err) => {
    res.status(400).send()
  })
})

// READ todo by id
app.get('/todos/:id', (req, res) => {
  let id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.sendStatus(400)
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.sendStatus(404)
    }
    res.send({todo})
  }).catch((err) => {
    res.status(400).send()
  })
})

// DELETE todo by id
app.delete('/todos/:id', (req, res) => {
  // get id
  let id = req.params.id

  // validate id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Invalid ObjectID')
  }

  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    // success -> if no doc, 404 || send doc back with 200
    if (!todo) {
      return res.sendStatus(404)
    }
    res.send({todo})
  }).catch((err) => {
    // error -> 400 with empty body
    res.status(400).send()
  })
})

// UPDATE todo by id
app.patch('/todos/:id', (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(400).send('Invalid ObjectID')
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.sendStatus(404)
    }

    res.send({todo})
  }).catch((err) => {
    res.status(400).send()
  })
})

// CREATE new user
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])
  let user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((err) => {
    res.status(400).send()
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

// POST users/login {email, password}
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user)
    })
  }).catch((err) => {
    res.status(400).send(err)
  })
})

// DELETE users/login "logout"
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})

app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = {app}
