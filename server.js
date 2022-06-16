const http = require('http');
const { getTodos, createTodo, updateTodo, deleteTodo} = require('./controllers/controllers')


const PORT = process.env.PORT || 8080

const server = http.createServer((req, res) => {
  if (req.url === '/myapi/todos' && req.method === 'GET') {
    getTodos(req, res)
  } else if (req.url === '/myapi/todos' && req.method === 'POST') {
    createTodo(req, res)
  } else if (req.url === '/myapi/todos' && req.method === 'PUT') {
    updateTodo(req, res)
  } else if (req.url === '/myapi/todos' && req.method === 'DELETE') {
    deleteTodo(req, res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'not found' }))
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})