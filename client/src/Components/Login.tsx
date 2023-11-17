import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignupParams } from '@pradheep1647/common';
import { 
    Box, 
    Button, 
    Grid, 
    TextField, 
    Typography,
    Container,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const dataToSend: SignupParams = { username, password };
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/todos";
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <Container maxWidth="sm">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center">
                        Login
                    </Typography>
                    <TextField
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        type="password"
                        margin="normal"
                        fullWidth
                    />
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </CardActions>
                <CardContent>
                    <Typography variant="body2" align="center">
                        New here? <Link to="/signup">Signup</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
