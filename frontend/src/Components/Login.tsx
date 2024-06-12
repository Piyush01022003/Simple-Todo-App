import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            navigate("/todos");
        } else {
            alert("invalid credentials");
        }
    };

    return (
        // <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
        //     <div>
        //         <h2>Login</h2>
        //         <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        //         <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        //         New here? <Link to="/signup">Signup</Link>
        //         <button onClick={handleLogin}>Login</button>
        //     </div>
        // </div>
        <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"} fontWeight={600}>
                    Hi there. Login below
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant={"outlined"} style={{ width: 400, padding: 20, backgroundColor:"#F1F1F1"}}>
                    <TextField
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        fullWidth={true}
                        label="Username"
                        variant="outlined"
                    />
                    <br /><br />
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        type={"password"}
                    />
                    <br /><br />
                    <center>
                        <Button
                            size={"large"}
                            variant="contained"
                            onClick={handleLogin}> Signin</Button>
                    </center>

                </Card>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <Typography variant={"h6"} fontWeight={600}>
                    New here? <Link to="/signup">SignUp</Link>
                </Typography>
            </div>
        </div>
    );
};

export default Login;
