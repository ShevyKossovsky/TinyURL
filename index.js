import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import UserRouter from './Routers/UserRouter.js';
import LinkRouter from './Routers/LinkRouter.js';

const app = express();

// Connect to MongoDB using the URI from the environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(cors());
app.use(bodyParser.json());


app.use('/users', UserRouter);
app.use('/links', LinkRouter);

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-size: 40px;
          }
        </style>
      </head>
      <body>
        Hello Tiny url!😀
      </body>
    </html>
  `);
});



app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: 'An unexpected error occurred' });
});


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
