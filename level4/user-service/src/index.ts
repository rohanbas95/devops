import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb');

// User Schema
const userSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model('User', userSchema);

// REST API
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedUser);
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});