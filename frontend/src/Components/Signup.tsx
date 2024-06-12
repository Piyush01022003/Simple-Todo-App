import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        const response = await fetch('http://localhost:3000/auth/signup', {
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
            alert("Error while signing up");
        }
    };

    return (
        // <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
        //     <div>
        //         <h2>Signup</h2>
        //         <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
        //         <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
        //         Already signed up? <Link to="/login">Login</Link>
        //         <button onClick={handleSignup}>Signup</button>
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
                    Hi there. Sign up below
                </Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant={"outlined"} style={{ width: 400, padding: 20, backgroundColor:"#F1F1F1"}}>
                    <TextField
                        onChange={(event) => {
                            setUsername(event.target.value);
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
                            onClick={handleSignup}>Signup</Button>
                    </center>

                </Card>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <Typography variant={"h6"} fontWeight={600}>
                    Already signed up? <Link to="/login">Login</Link>
                </Typography>
            </div>

        </div>
    );
};

export default Signup;
