var express = require('express'); //web framework
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');

const connection = require('./config/database');
const config = require('./config/config');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT;

// import routes
var adminRouter = require('./routes/admin');


var app = express();
app.use(logger('dev'));

//for image upload to accept large files
app.use(express.json( {limit : '50mb' }));
app.use(express.urlencoded({limit: '50mb'}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cors
app.use(cors());

//name the routes and set it on angular request [http://localhost/admin/login]
app.use('/admin', adminRouter);
//app.use('/users', usersRouter);

// Add Headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', process.env.NG_HOST);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'x-account, accept, access-control-request-origin');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });
  
  
  
  // caching disabled for every route
  app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  });

   //for example
  /* var sql = "SELECT * from admin";
  connection.query(sql, function(err, results, rows){
    if(err){
    throw err;
        } else {
            console.log(results);
        }
    });*/
  
  app.listen(port);
console.log("This listing port is " + port);
