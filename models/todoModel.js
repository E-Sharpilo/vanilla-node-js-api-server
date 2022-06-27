let todos = require('../data/todos.json');
const { writeDataToFile } = require('../utils')

function getAll() {
  return new Promise((resolve, reject) => {
    resolve(todos)
  })
}

function create(todo) {
  return new Promise((resolve, reject) => {
    const newTodo = { ...todo }
    todos.push(newTodo)
    writeDataToFile('./data/todos.json', todos)
    resolve(newTodo)
  })
}

function findTodoById(id) {
  return new Promise((resolve, reject) => {
    const todo = todos.find((item) => item.id === id)
    resolve(todo)
  })
}

function update(id, todo) {
  return new Promise((resolve, reject) => {
    const index = todos.findIndex((item) => item.id === id)
    todos[index] = {id, ...todo }
    writeDataToFile('./data/todos.json', todos)
    resolve(todos)
  })
}

function remove(id) {
  return new Promise((resolve, reject) => {
    todos = todos.filter(todo => todo.id !== id)
    writeDataToFile('./data/todos.json', todos)
    resolve(todos)
  })
}


module.exports = {
  getAll,
  create,
  findTodoById,
  update,
  remove
}