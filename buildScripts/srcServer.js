import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

/* eslint-disable no-console */
const port = process.env.PORT || 3000;
const app = express();
const compiler = webpack(config);

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

import userRouter from '../src/api/userRoute';
userRouter();
app.use('/api', userRouter);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'), {})
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
