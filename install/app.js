//var request = require('request');
//
//request
//    .post('http://urp.tf-swufe.net:8080/cas/login?service=http://spoc.tfswufe.edu.cn/Home/Login')
//    .send({ username: '41403245', password: '823305' })
//    .set('X-API-Key', 'foobar')
//    .set('Accept', 'application/json')
//    .end(function(res){
//        if (res.ok) {
//            alert('yay got ' + JSON.stringify(res.body));
//        } else {
//            alert('Oh no! error ' + res.text);
//        }
//    });
//
//request('http://www.google.com', function (error, response, body) {
//    if (!error && response.statusCode == 200) {
//        console.log(body) // 打印google首页
//    }
//})
//
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine=require('./system');
var routes = require('./routes/index');
var setting=require('./setting');
var flash=require("connect-flash");
var gravatar = require('gravatar');
var multer  = require('multer');
var marked = require('marked');
var request = require('request');
var queryString = require('querystring');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use(session({
//    secret:setting.cookieSecret,
//    key:setting.db,
//    cookie:{maxAge:1000*60*60*24*30},
//    store:new MongoStore({
//        db:setting.db,
//        host:setting.host,
//        port:setting.port
//    }),
//    resave: true,
//    saveUninitialized: true
//}));
//app.use(flash());

routes(app);//绑定路由到express上;
app.engine("ejs",engine);
//app.locals._layoutFile='index';



app.listen(8000);
// 引入 superagent、cheerio
　　