import jwt from 'jsonwebtoken';
import express from 'express';
import { authenticateJwt, SECRET } from '../middleware/';
import { User } from '../db';
const router = express.Router();

  interface AuthBody{
    username: string;
    password: string;
  }
  router.post('/signup', async (req, res) => {    //router comes from express and express already defines types of req as Request and res as Response
    const inputs:AuthBody = req.body;  
    const user = await User.findOne({ username: inputs.username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username: inputs.username, password: inputs.password});
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const inputs:AuthBody = req.body;
    const user = await User.findOne({ username: inputs.username, password:inputs.password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req, res) => {
      const userId = req.headers["userId"];
      const user = await User.findOne({ _id: userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  // module.exports = router
  export default router