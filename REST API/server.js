const express = require('express');
const app = express();

app.use(express.json());

const PORT = 3000;

let todos = [
  { "id": 1, "title": "Learn Express", "done": false },
  { "id": 2, "title": "Build Todo API", "done": false },
];

let nextId = 3;

app.get('/', (req, res) => {
  res.send("Todo API is running!");
});

app.get('/todos', (req, res) => {
  res.json(todos);
})

app.get('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ "message": "Todo not found" });
  }

  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const newTodo = {
    "id": nextId++,
    title,
    "done": false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, done } = req.body;

  const todo = todos.find(t => t.id === id);
  if (!todo) {
    res.status(404).json({ "message": "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (done !== undefined) todo.done = done;

  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    res.status(400).json({ "message": "Todo not found" });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})