// const express_lib = require('express');
// const app = express_lib();
// const PORT = 10000;

// app.use((req, res, next) => {
//   console.log(`[${req.method}] ${req.url}`);
//   next();
// });


// app.get('/user/:id', (req, res) => {
//     const { id } = req.params;
//     const {lang} = req.query;


//     res.send(`User ID : ${id}, Language : ${lang}`);
// });

// app.post('/api', (req, res) => {
//   const data = req.body;
//   res.status(201).json({ message: 'Data received', data });
// });


// app.listen(PORT, () => {
//     console.log(`server is running on http://localhost:${PORT}/api`);
//     console.log(`server is running on http://localhost:${PORT}/user/10?lang=en`);
// });

// const express = require('express');
// const app = express()

// app.use(express.json());

// const PORT = 3000;

// app.get('/', (req, res) => {
//     res.send('Todo API is running.');
// });

// app.get('/todos', (req, res) => {
//     res.json([
//         {"id": 1, "title": 'Learn express', "done": false},
//         {"id": 2, "title": 'Build Todo API', "done": false}
//     ]);
// });

// app.listen(PORT, () => {
//     console.log(`server is running on http://localhost:${PORT}`);
// })

// 1. Import Express
const express = require('express');
const app = express();

// 2. Middleware to parse JSON body
app.use(express.json());

// 3. Port for the server
const PORT = 3000;

// 4. In-memory "database" (array)
let todos = [
  { id: 1, title: 'Learn Express', done: false },
  { id: 2, title: 'Build Todo API', done: false }
];
let nextId = 3;

// 5. Root route (just to check server)
app.get('/', (req, res) => {
  res.send('Todo API is running ✅');
});


// =============== CRUD ENDPOINTS ===============

// READ ALL – GET /todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// READ ONE – GET /todos/:id
app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.json(todo);
});

// CREATE – POST /todos
// body example: { "title": "New task" }
app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: nextId++,
    title,
    done: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// UPDATE – PUT /todos/:id
// body example: { "title": "Updated title", "done": true }
app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  if (title !== undefined) todo.title = title;
  if (done !== undefined) todo.done = done;

  res.json(todo);
});

// DELETE – DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send(); // No content
});


// 6. Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
