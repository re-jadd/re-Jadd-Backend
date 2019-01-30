const express = require('express');
const port = 3000;
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// const tvController = require('./controllers/showsController');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.send('TV SHOWS!');
})

// ADD YOUR CONTROLLER HERE!!!

// app.use('/show', tvController);


app.listen(port, () => {
  console.log('---------------------------------------');
  console.log('Express listening on localhost:' + port);
  console.log('---------------------------------------');
});