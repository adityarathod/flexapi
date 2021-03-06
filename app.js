var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var compression = require('compression')


var versionZeroRouter = require('./routes/v0');
var versionOneRouter = require('./routes/v1');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'doc')));
app.use(cors());

app.use('/', versionZeroRouter);
app.use('/v1', versionOneRouter);
app.use('/users', usersRouter);

module.exports = app;
