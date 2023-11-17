"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().min(1).max(16),
    password: zod_1.z.string().min(1).max(16)
});
exports.todoInput = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string()
});
