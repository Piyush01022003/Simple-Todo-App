"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
var port = 3000;
var mongoose_1 = require("mongoose");
var auth_1 = require("./routes/auth");
var todo_1 = require("./routes/todo");
var cors_1 = require("cors"); //npm i --save-dev @types/cors  
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
mongoose_1.default.connect('mongodb://localhost:27017/courses', { dbName: "courses" });
