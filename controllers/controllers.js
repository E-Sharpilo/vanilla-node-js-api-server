const Todos = require('../models/todoModel');
const { getRequestBody } = require('../utils')


async function getTodos(req, res) {
  try {
    const todos = await Todos.getAll();

    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify(todos))
  } catch (error) {
    console.log(error);
  }
}

async function deleteTodo(req, res) {
  try {
    const body = await getRequestBody(req)
    const { id } = JSON.parse(body)
    const todo = await Todos.findTodoById(id);

    if (!todo) {
      res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      res.end(JSON.stringify({ message: 'Todo not found' }))
    } else {
      await Todos.remove(id)
      const todos = await Todos.getAll();
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
      res.end(JSON.stringify(todos))
    }
  } catch (error) {
    console.log(error);
  }
}

async function createTodo(req, res) {
  try {
    const body = await getRequestBody(req)
    const { title, completed, id } = JSON.parse(body)

    const todo = {
      id,
      title,
      completed,
    }

    const newTodo = await Todos.create(todo)
    res.writeHead(201, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
    res.end(JSON.stringify(newTodo))
  } catch (error) {
    console.log(error);
  }
}

async function updateTodo(req, res) {
  try {
    const body = await getRequestBody(req)
    const { title, completed, id } = JSON.parse(body)
    const todo = await Todos.findTodoById(id)

    if (!todo) {
      res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      res.end(JSON.stringify({ message: 'Todo not found' }))
    } else {
      const tempTodo = {
        id,
        title,
        completed
      }
      const updTodo = await Todos.update(id, tempTodo)
      res.writeHead(201, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
      res.end(JSON.stringify(updTodo))
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
}