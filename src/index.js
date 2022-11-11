const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

const userRoutes = require('./routes/user');
const specialtyRoutes = require('./routes/specialties');

// middleware
app.use(express.json());
app.use('/api', [userRoutes, specialtyRoutes]);

// routes
app.get('/ping', (req, res) => res.send('pong'));
app.get('/', (req, res) => res.send('Welcome to my API'));

// mongodb connectioon
mongoose
  .connect(process.env.APP_MONGODB_URI, {
    dbName: process.env.APP_MONGODB_DB_CRBV,
  })
  .then(() =>
    console.log(
      `Connected to MongoDB Atlas - DB ${process.env.APP_MONGODB_DB_CRBV}`
    )
  )
  .catch((error) => console.error(error));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
