import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './Routers/UserRouter.js';
import linkRoutes from './Routers/LinkRouter.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/TinyUrl_DB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/links', linkRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: 'An unexpected error occurred' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
