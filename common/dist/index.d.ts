import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type SignupParams = z.infer<typeof signupInput>;
export declare const todoInput: z.ZodObject<{
    _id: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    done: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    _id: string;
    title: string;
    description: string;
    done: boolean;
}, {
    _id: string;
    title: string;
    description: string;
    done: boolean;
}>;
export type TodoParams = z.infer<typeof todoInput>;
