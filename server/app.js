const express = require('express');
const morgan = require('morgan')
const artistRouter = require('./src/routers/planet.router');
const aiRouter = require('./src/routers/ai.router')


const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/planet', artistRouter);
app.use('/api/ai', aiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;