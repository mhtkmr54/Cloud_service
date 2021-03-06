var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var convert = require('./routes/convert.js');
var result = require('./routes/result.js');

var app = express();

var Spreadsheet = require('edit-google-spreadsheet');
//export PEM_KEY="`cat shaastra-cloud-service.pem`";
/*
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2('116597258143-0ucr316opcu5mcee172r43ho9n8sq134.apps.googleusercontent.com', 'C9Ja387Jx1pVK1fXDJ_aFY_', 'http://localhost:3000/');

oauth2Client.setCredentials({
  access_token: 'ACCESS TOKEN HERE',
  refresh_token: 'REFRESH TOKEN HERE'
});
*/
Spreadsheet.load({
    debug: true,
    spreadsheetName: 'test',
    worksheetName: 'Sheet1',

    oauth : {
        email: 'shaastra-cld@shaastra-cloud-service.iam.gserviceaccount.com',
        keyFile: 'google-oauth.pem'
    }

   /*oauth2: {
      client_id: '116597258143-0ucr316opcu5mcee172r43ho9n8sq134.apps.googleusercontent.com',
      client_secret: '-C9Ja387Jx1pVK1fXDJ_aFY_',
      //refresh_token: 'token generated with get_oauth2_permission.js'
    },*/

/*
  access_token: 'ACCESS TOKEN HERE',
  refresh_token: 'REFRESH TOKEN HERE'
}); */

}, function sheetReady(err, spreadsheet) {

    if (err) {
        throw err;
    }

    spreadsheet.receive(function(err, rows, info) {
        if (err) {
            throw err;
        }

        console.dir(rows);
        console.dir(info);
    });

});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/convert', convert);
app.use('/result', result);

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