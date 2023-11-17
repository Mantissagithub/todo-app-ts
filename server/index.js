"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var app = express_1();
var port = 3000;
var auth_1 = require("./routes/auth");
var todo_1 = require("./routes/todo");
var cors_1 = require("cors");
app.use(cors_1());
app.use(express_1.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
mongoose_1.default.connect('mongodb://localhost:27017/courses', { dbName: "courses" });
