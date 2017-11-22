const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routesApi = require('./routes');
const port = 8000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(routesApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    res.status(404);
    res.json({
        errorStatus: err.status,
        errorMessage: err.message
    })
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status);
    res.json({
        errorStatus: err.status,
        errorMessage: err.message
    })
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
