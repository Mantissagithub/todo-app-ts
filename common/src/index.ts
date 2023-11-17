import {z} from "zod";

export const signupInput = z.object({
    username : z.string().min(1).max(16),
    password : z.string().min(1).max(16)
});

export type SignupParams = z.infer<typeof signupInput>;

export const todoInput = z.object({
    _id : z.string(),
    title : z.string(),
    description : z.string(),
    done : z.boolean()
});


export type TodoParams = z.infer<typeof todoInput>