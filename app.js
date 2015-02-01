var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');
var uuid = require('node-uuid');

var routes = require('./routes/index');
var moe = require('./routes/moe');
var moeCompetition = require('./routes/moeCompetition');
var moeResult = require('./routes/moeResult');
var pixiv = require('./routes/pixiv');

var categoryModel = require('./models/category');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config().secret,
  resave: false, 
  saveUninitialized: true, 
  genid: function(req) {
    return uuid.v1();
  },
}));
app.use(express.static(path.join(__dirname, 'public')));

categoryModel.findAll(function(err, categories){
  app.set('moeCategories', categories);
});

app.use('/', routes);
app.use('/moe', moe);
app.use('/moe_competition', moeCompetition);
app.use('/moe_result', moeResult);
app.use('/pixiv', pixiv);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
