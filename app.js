
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var env = (function(){
    var Habitat = require("habitat");
    Habitat.load();
    return new Habitat();
}());
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.cookieParser());
// app.use(express.session({secret: 'keyboard cat'}));
app.use(express.cookieSession({
    key: "mysite.sid",
    secret: env.get("SESSION_SECRET"),
    cookie: {
        maxAge: 2678400000 // 31 days
    }
}));
app.use(express.csrf());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
