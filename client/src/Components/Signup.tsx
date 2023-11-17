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

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        const dataToSend: SignupParams = { username, password };
        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/todos";
        } else {
            alert("Error while signing up");
        }
    };

    return (
        <Container maxWidth="sm">
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom align="center">
                        Signup
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
                    <Button variant="contained" color="primary" onClick={handleSignup}>
                        Signup
                    </Button>
                </CardActions>
                <CardContent>
                    <Typography variant="body2" align="center">
                        Already signed up? <Link to="/login">Login</Link>
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Signup;
