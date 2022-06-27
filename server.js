const http = require('http');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('./controllers/controllers')


const PORT = 8080

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    console.log('options');
    const headers = {}
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400';
    headers["Access-Control-Allow-Headers"] = "Content-Type";
    res.writeHead(200, headers)
    res.end()
  } else {
    if (req.url === '/myapi/todos' && req.method === 'GET') {
      console.log('get');
      getTodos(req, res)
    } else if (req.url === '/myapi/todos' && req.method === 'POST') {
      createTodo(req, res)
    } else if (req.url.match(/\/myapi\/todos\/([0-9]+)/) && req.method === 'PUT') {
      console.log('PUT');
      const id = req.url.split('/')[3]
      updateTodo(req, res, id)
    } else if (req.url.match(/\/myapi\/todos\/([0-9]+)/) && req.method === 'DELETE') {
      const id = req.url.split('/')[3]
      deleteTodo(req, res, id)
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'not found' }))
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})