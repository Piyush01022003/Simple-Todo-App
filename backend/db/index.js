"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
var todoSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Todo = mongoose_1.default.model('Todo', todoSchema);
//we can export this way as well
// export default {
//     User,
//     Todo
// }
