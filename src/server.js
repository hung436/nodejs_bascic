import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import connectDB from './config/connectDB.JS';
import bodyParser from 'body-parser';

import cors from 'cors';
const app = express();
require('dotenv').config();
app.use(cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
const port = process.env.PORT || 8080;
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoute(app);
configViewEngine(app);
app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
module.exports = app;
