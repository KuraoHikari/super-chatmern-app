import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import messagesRoutes from './routes/messages.js';
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);

const connect = () => {
  mongoose
    .connect(process.env.CONNECTION_URL)
    .then(() => {
      console.log('mongo connect to collection superChat');
    })
    .catch((err) => {
      throw err;
    });
};

const server = app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server Started on PORT ${process.env.PORT}`);
});
