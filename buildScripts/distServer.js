import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

/* eslint-disable no-console */
const port = process.env.PORT || 80;
const app = express();

app.use(compression());
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'), {})
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});

// Test data shold be DB.
app.get('/users', (req, res) => {
  res.json([
    {"id": 1,"firstName":"Bob"},
    {"id": 2,"firstName":"Tammy"},
    {"id": 3,"firstName":"Tina"}
  ])
})