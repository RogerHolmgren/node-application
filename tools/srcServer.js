import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import config from '../webpack.config.dev';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

/* eslint-disable no-console */
const port = process.env.PORT || 3000;
const app = express(); //WebServer
const compiler = webpack(config);

mongoose.connect('mongodb://localhost/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db');
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'), {})
});

// Start up express
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
