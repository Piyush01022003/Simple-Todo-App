"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var middleware_1 = require("../middleware");
var db_1 = require("../db");
var router = express_1.default.Router();
router.post('/todos', middleware_1.authenticateJwt, function (req, res) {
    var inputs = req.body; //not necessary but good practice to catch typo
    var done = false;
    var userId = req.headers["userId"];
    var newTodo = new db_1.Todo({ title: inputs.title, description: inputs.description, done: inputs.done, userId: inputs.userId });
    newTodo.save()
        .then(function (savedTodo) {
        res.status(201).json(savedTodo);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to create a new todo' });
    });
});
router.get('/todos', middleware_1.authenticateJwt, function (req, res) {
    var userId = req.headers["userId"]; //not req.userId as we changed it in middleware/index.js
    db_1.Todo.find({ userId: userId })
        .then(function (todos) {
        res.json(todos);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});
router.patch('/todos/:todoId/done', middleware_1.authenticateJwt, function (req, res) {
    var todoId = req.params.todoId;
    var userId = req.headers["userId"];
    db_1.Todo.findOneAndUpdate({ _id: todoId, userId: userId }, { done: true }, { new: true })
        .then(function (updatedTodo) {
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
    })
        .catch(function (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    });
});
// module.exports = router;
exports.default = router;
