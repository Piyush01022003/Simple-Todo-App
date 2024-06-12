import express from 'express';
import { authenticateJwt, SECRET } from '../middleware'; 
import { Todo } from '../db'; 
const router = express.Router();

interface CreateTodoInput{
  title:string;
  description: string;
  done:boolean;
  userId: string;
}

router.post('/todos', authenticateJwt, (req, res) => {
  const inputs: CreateTodoInput = req.body;     //not necessary but good practice to catch typo
  const done = false;
  const userId = req.headers["userId"];

  const newTodo = new Todo({ title: inputs.title, description: inputs.description, done:inputs.done, userId: inputs.userId });

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];    //not req.userId as we changed it in middleware/index.js

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req, res) => {
  const { todoId } = req.params;
  const userId = req.headers["userId"];

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

// module.exports = router;
export default router