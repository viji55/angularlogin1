var express = require('express');
var router = express.Router();
const app = express();
const connection = require('.././config/database');
const jwt = require('jsonwebtoken');
const config = require('.././config/config');


router.post('/login',function(req,res,next){

    let data = req.body;
    console.log(data);
});


module.exports = router;