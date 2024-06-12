import { useState, useEffect } from 'react';
import { authState } from '../store/authState.js';
import { useRecoilValue } from "recoil";
import { useNavigate } from 'react-router-dom';
import { Card, TextField, Button, Typography } from '@mui/material';

interface Todo {
    _id: string;
    title: string;
    description: string;
    done: boolean;
}
const TodoList = () => {
    const [todos, setTodos] = useState<Todo[]>([]);  //type of this state variable
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);
    const navigate = useNavigate();

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            // Todo: Create a type for the response that you get back from the server
            const data: Todo[] = await response.json();
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
        setTodos([...todos, data]); //adds latest todo to the current todo.
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
            <center>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant={"h6"}>
                        Welcome <b> {authStateValue.username} </b>
                    </Typography>
                    <div>
                        <Button
                            size={"small"}
                            variant={"outlined"}
                            onClick={() => {
                                localStorage.removeItem("token");
                                navigate("./login");
                            }}>
                            Logout
                        </Button>
                    </div>
                </div>
                <Typography variant={"h6"} fontWeight={"550"}>Add New Todo</Typography>
                <br />
                <Card variant={"outlined"} style={{ width: 400, padding: 20,backgroundColor:"#FEFAF6"}}>
                    <TextField
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        fullWidth={true}
                        label="Title"
                        variant="outlined"
                    />
                    <br /> <br />
                    <TextField
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        fullWidth={true}
                        label="Description"
                        variant="outlined"
                    />
                    <br /> <br />
                    <center>
                        <Button
                            size={"medium"}
                            variant="contained"
                            color={"success"}
                            onClick={addTodo}> Add Todo</Button>
                    </center>
                </Card>
                <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap"}}>
                    {todos.map((todo) => (
                        <div key={todo._id}>
                            {/* <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button> */}
                            <Card style={{
                                margin: 20,
                                width: 150,
                                minHeight: 150,
                                padding: 10,
                                backgroundColor:"#FEFAF6"
                            }}>
                                <Typography>
                                    {todo.title}
                                </Typography>
                                <Typography>
                                    {todo.description}
                                </Typography>
                                <Button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}
                                </Button>
                            </Card>
                        </div>
                    ))}
                </div>

            </center>
        </div>

    );
};

export default TodoList;
