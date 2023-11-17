import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { authState } from '../store/authState.js';
import { TodoParams } from "@pradheep1647/common";
import { 
    Typography, 
    TextField, 
    Button, 
    Card, 
    CardContent,
    CardActions,
} from '@mui/material';

type TodoArray = TodoParams[];

const TodoList = () => {
    const [todos, setTodos] = useState<TodoArray>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    // Replace this with your actual authentication state retrieval
    const authStateValue = useRecoilValue(authState);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data: TodoParams[] = await response.json();
            setTodos(data);
        };
        getTodos();
    }, []);

    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();
        setTodos([...todos, data]);
    };

    const markDone = async (id: string) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: '20px' }}>
                <Typography variant="h4">Welcome {authStateValue.username}</Typography>
                <div style={{ marginLeft: 'auto' }}>
                    <Button variant="contained" onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}>Logout</Button>
                </div>
            </div>
            <Typography variant="h5" gutterBottom>Todo List</Typography>
            <div style={{ display: "flex", gap: "10px", marginBottom: '20px' }}>
                <TextField 
                    variant="outlined" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    label='Title' 
                />
                <TextField 
                    variant="outlined" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    label='Description' 
                />
                <Button variant="contained" onClick={addTodo}>Add Todo</Button>
            </div>

            {todos.map((todo) => (
                <Card key={todo._id} style={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Typography variant="h6">{todo.title}</Typography>
                        <Typography variant="body1">{todo.description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button 
                            onClick={() => markDone(todo._id)}
                            variant="outlined" 
                            color={todo.done ? 'primary' : 'secondary'}
                        >
                            {todo.done ? 'Done' : 'Mark as Done'}
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

export default TodoList;
