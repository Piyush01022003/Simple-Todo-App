import express from 'express';
const app = express(); 
const port = 3000; 
import  mongoose  from 'mongoose'; 
import authRoutes from './routes/auth'; 
import todoRoutes from './routes/todo'; 
import cors from 'cors';  //npm i --save-dev @types/cors  


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb://localhost:27017/courses', { dbName: "courses" });  //Your mongodb string
